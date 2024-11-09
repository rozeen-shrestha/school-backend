import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  ISBN: { type: String, required: true },
  publicationYear: { type: Number },
  genre: [String],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  language: { type: String },
  description: { type: String },
  coverImageUrl: { type: String },
  pdfUrl: { type: String },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  addedAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.models.Book || mongoose.model('Book', BookSchema);
