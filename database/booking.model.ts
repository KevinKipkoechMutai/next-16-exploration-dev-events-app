import { Schema, model, models, Document, Types } from 'mongoose';
import Event from './event.model';

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (email: string) {
          // RFC 5322 compliant email validation regex
          const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
          return emailRegex.test(email);
        },
        message: 'Please provide a valid email address',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook: Validate that the referenced Event exists
// Modern Mongoose style: async function, no `next` parameter or call
BookingSchema.pre('save', async function () {
  const booking = this as IBooking;

  // Only check if eventId is new or modified
  if (!booking.isNew && !booking.isModified('eventId')) {
    return; // Skip validation if unchanged
  }

  try {
    const eventExists = await Event.findById(booking.eventId).select('_id').lean();

    if (!eventExists) {
      // Throw a validation error — Mongoose will catch and return it properly
      throw new Error(`Event with ID ${booking.eventId} does not exist`);
    }
  } catch (err) {
    // Re-throw as ValidationError so it appears in validation errors
    const validationError = new Error(
      err instanceof Error ? err.message : 'Invalid event ID or database error'
    );
    validationError.name = 'ValidationError';
    throw validationError;
  }

  // No next() needed — Mongoose automatically continues if no error thrown
});

// Indexes (all good — keep them)
BookingSchema.index({ eventId: 1 });
BookingSchema.index({ eventId: 1, createdAt: -1 });
BookingSchema.index({ email: 1 });
BookingSchema.index({ eventId: 1, email: 1 }, { unique: true, name: 'uniq_event_email' });

const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking;