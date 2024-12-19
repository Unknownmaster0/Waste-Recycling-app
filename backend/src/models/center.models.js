import mongoose from 'mongoose';

const PointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const CenterSchema = new mongoose.Schema(
  {
    location: {
      type: PointSchema,
      required: true,
    },
    bin_type: {
      type: String,
      enum: ['Plastic', 'Organic', 'Metal', 'Sergical', 'General waste'],
      required: true,
    },
  },
  { timestamps: true }
);

export const Center = mongoose.model('Center', CenterSchema);
