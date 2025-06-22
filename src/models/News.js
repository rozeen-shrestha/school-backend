import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
  title: String,
  message: String,
  images: [String],
  lastEdited: { type: Date, default: Date.now }
});

export const NewsModel = mongoose.models.News || mongoose.model('News', NewsSchema);
