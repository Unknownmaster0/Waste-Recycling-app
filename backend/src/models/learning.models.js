import mongoose from 'mongoose';

const ResourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
  },
  { timestamps: true }
);

const Resource = mongoose.model('Resource', ResourceSchema);
export default Resource;