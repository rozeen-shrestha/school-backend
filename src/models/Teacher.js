import mongoose from 'mongoose';

const TeacherSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  subject: String,
  customSubject: String,
  facebook: String,
  instagram: String,
  photoUrl: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

export const TeacherModel = mongoose.models.Teacher || mongoose.model('Teacher', TeacherSchema);
