import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

import connectDB from "@/lib/mongodb";
import Event from '@/database/event.model';

// Force Node.js runtime for Buffer and full File support
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();

        console.log('All entries received:');
        for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
            console.log(key, `File: ${value.name}, ${value.size} bytes, type: ${value.type}`);
        } else {
            console.log(key, value);
        }
        }

        const file = formData.get('image');

        if (!file || !(file instanceof File)) {
            return NextResponse.json({ message: 'Image file is required' }, { status: 400 });
        }

        // Parse other fields safely
        const tagsStr = formData.get('tags') as string | null;
        const agendaStr = formData.get('agenda') as string | null;

        if (!tagsStr || !agendaStr) {
            return NextResponse.json({ message: 'Tags and agenda are required' }, { status: 400 });
        }

        let tags, agenda;
        try {
            tags = JSON.parse(tagsStr);
            agenda = JSON.parse(agendaStr);
        } catch (e) {
            return NextResponse.json({ message: 'Invalid tags or agenda format' }, { status: 400 });
        }

        // Convert File to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Cloudinary
        const uploadResult: any = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { resource_type: 'image', folder: 'DevEvent' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        });

        // Create event (spread the rest of the form fields)
        const eventData = Object.fromEntries(formData.entries());
        delete eventData.image; // Remove the file entry if you don't want it in DB
        delete eventData.tags;
        delete eventData.agenda;

        const createdEvent = await Event.create({
            ...eventData,
            image: uploadResult.secure_url,
            tags,
            agenda,
        });

        return NextResponse.json({ message: 'Event created successfully', event: createdEvent }, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { message: 'Event Creation Failed', error: e instanceof Error ? e.message : 'Unknown' },
            { status: 500 }
        );
    }
}