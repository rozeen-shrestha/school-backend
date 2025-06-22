import mongoose from 'mongoose';

const NoticeSchema = new mongoose.Schema({
  title: {
    en: { type: String, default: '' },
    np: { type: String, default: '' }
  },
  news: [
    {
      en: String,
      np: String
    }
  ]
});

export const Notice = mongoose.models.Notice || mongoose.model('Notice', NoticeSchema);
