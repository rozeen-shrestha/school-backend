import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  uploads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Upload' }]
});

export const CategoryModel = mongoose.models.Category || mongoose.model('Category', CategorySchema);
