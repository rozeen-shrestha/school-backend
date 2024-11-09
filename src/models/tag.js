import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Tag || mongoose.model('Tag', TagSchema);
