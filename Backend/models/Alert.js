import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  message: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  recipients: [String],
});

export default mongoose.model('Alert', alertSchema);
