import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  role: { type: String, required: true, trim: true },
  ctc: { type: Number, required: false, min: 0 },
  experience: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);