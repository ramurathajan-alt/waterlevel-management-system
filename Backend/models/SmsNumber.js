import mongoose from "mongoose";

const smsNumberSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("VerifiedNumber", smsNumberSchema);
