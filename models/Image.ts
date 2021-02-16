import mongoose, { Schema, Document, model } from "mongoose";

interface Image extends Document {
  name: string;
  date: Date;
  data: string;
}

const ImageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  data: {
    type: String,
    required: true
  }
});

export default mongoose.models.Image || model<Image>("Image", ImageSchema);
