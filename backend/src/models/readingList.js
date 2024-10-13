import mongoose from 'mongoose';

const ReadingListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  createdAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.models.ReadingList || mongoose.model('ReadingList', ReadingListSchema);
