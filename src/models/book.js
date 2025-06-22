import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  BookId: { type: Number, unique: true },
  title: String,
  author: String,
  ISBN: String,
  publicationYear: Number,
  genre: [String],
  tags: [String],
  language: String,
  description: String,
  coverImageUrl: String,
  pdfUrl: String,
  addedBy: String,
  addedAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now }
});

export const BookModel = mongoose.models.Book || mongoose.model('Book', BookSchema);
