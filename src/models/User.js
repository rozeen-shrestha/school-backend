import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  permissions: {
    books: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    pdfs: { type: [String], default: [] }
  },
  email: { type: String, unique: true, sparse: true },
  fullName: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);
