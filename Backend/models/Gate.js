import mongoose from 'mongoose';

const gateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['open', 'closed'], default: 'closed' },
  waterLevel: { type: Number, default: 0 }, // in percentage (0–100)
  waterLevelFt: { type: Number, default: 0 }, // derived from percentage
  waterLevelState: { type: String, enum: ['Low', 'Normal', 'High', 'Critical'], default: 'Low' },
  location: { type: String },
  irrigationSchedule: { type: String },

}, {
  timestamps: true // 👈 This enables createdAt and updatedAt fields
});

const Gate = mongoose.model('Gate', gateSchema);

export default Gate;
