import { Schema } from 'mongoose';
import { model } from 'mongoose';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: Number,
      required: true,
    },
    tag: {
      type: String,
      required: true,
      enum: [
        'Shopping',
        'Meeting',
        'Travel',
        'Health',
        'Work',
        'Finance',
        'Personal',
        'Ideas',
        'Important',
        'Todo',
      ],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Note = model('Note', noteSchema);
