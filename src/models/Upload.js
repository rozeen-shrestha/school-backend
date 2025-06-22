import mongoose from 'mongoose';

const UploadSchema = new mongoose.Schema({
  originalFilename: String,
  filename: String,
  path: String,
  category: String,
  uploader: String,
  uploadDate: String
});

export const UploadModel = mongoose.models.Upload || mongoose.model('Upload', UploadSchema);
