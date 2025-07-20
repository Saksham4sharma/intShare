import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true, uppercase: true },
});

export default mongoose.models.Company || mongoose.model('Company', CompanySchema);