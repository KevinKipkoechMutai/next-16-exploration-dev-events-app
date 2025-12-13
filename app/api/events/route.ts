import { NextRequest, NextResponse } from "next/server";
import connectDB from '@/lib/mongodb'
import Event from '@/database/event.model'
import { v2 as cloudinary } from 'cloudinary'

export async function POST(req: NextRequest) {
    try {
        await connectDB()

        const formData = await req.formData()

        const event = Object.fromEntries(formData.entries())

        const file = formData.get('image') as File

        if (!file) return NextResponse.json({message: "Image file is required"}, {status: 400})

        let tags, agenda

        try {
            tags =  JSON.parse(formData.get('tags') as string)
            agenda = JSON.parse(formData.get('agenda') as string)
        } catch (e) {
            return NextResponse.json(
                {message: "Invalid JSON format for tags or agenda"},
                { status: 400 }
            )
        }

        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'DevEvent' }, (error, results) => {
                if (error) return reject(error);

                resolve(results)
            }).end(buffer);
        })

        if (!uploadResult || typeof uploadResult !== 'object' || !('secure_url' in uploadResult)) {
            return NextResponse.json(
                {message: "Failed to upload image to cloudinary"},
                {status: 500}
            )
        }

        event.image = (uploadResult as { secure_url: string }).secure_url

        const createdEvent = await Event.create({
            ...event,
            tags: tags,
            agenda: agenda,
        })

        return NextResponse.json({ message: 'Event created successfully', event: createdEvent }, { status: 201 })

    } catch (e) {
        console.error(e)
        return NextResponse.json({message: "Event creation failed", error: e instanceof Error ? e.message: 'Unknown'}, {status: 500})
    }
}


export async function GET() {
    try {
        await connectDB()

        const events = await Event.find().sort({ createdAt: -1 })

        return NextResponse.json({ message: 'Events fetched successfully', events }, { status: 200 })

    } catch (e) {
        return NextResponse.json({ message: 'Event fetching failed', error: e }, { status: 500 })
    }
}