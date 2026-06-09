import axios from 'axios';
import VerifiedNumber from '../models/SmsNumber.js';

const otpStore = new Map(); // In-memory OTP store

// Send OTP
export const sendOTP = async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ success: false, message: "Phone number is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
  otpStore.set(phoneNumber, { otp, expiresAt });

  try {
    const response = await axios.post(
      'https://app.text.lk/api/v3/sms/send',
      {
        recipient: phoneNumber,
        sender_id: process.env.TEXTLK_SENDER_ID,
        type: "plain",
        message: `Your OTP code is ${otp}`
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TEXTLK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data && response.data.status === 'success') {
      return res.json({ success: true, message: 'OTP sent successfully' });
    } else {
      return res.status(500).json({ success: false, message: response.data?.message || 'Failed to send OTP' });
    }
  } catch (error) {
    console.error("Text.lk API error:", error.response?.data || error.message);
    return res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  if (!phoneNumber || !otp) {
    return res.status(400).json({ success: false, message: 'Phone number and OTP are required' });
  }

  const record = otpStore.get(phoneNumber);

  if (!record) {
    return res.status(400).json({ success: false, message: 'OTP not sent or expired' });
  }

  if (record.otp !== otp) {
    return res.status(400).json({ success: false, message: 'Invalid OTP' });
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(phoneNumber);
    return res.status(400).json({ success: false, message: 'OTP expired' });
  }

  try {
    const exists = await VerifiedNumber.findOne({ phoneNumber });
    if (!exists) {
      await VerifiedNumber.create({ phoneNumber });
    }

    otpStore.delete(phoneNumber);
    return res.json({ success: true, message: 'Phone number verified and saved' });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ success: false, message: 'Verification failed' });
  }
};

// Get all verified numbers
export const getVerifiedNumbers = async (req, res) => {
  try {
    const numbers = await VerifiedNumber.find({});
    return res.json({ success: true, numbers });
  } catch (error) {
    console.error("Fetch error:", error);
    return res.status(500).json({ success: false, message: 'Failed to fetch verified numbers' });
  }
};

// Delete a verified number
export const deleteVerifiedNumber = async (req, res) => {
  const { phoneNumber } = req.params;

  try {
    const result = await VerifiedNumber.deleteOne({ phoneNumber });
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'Phone number not found' });
    }

    return res.json({ success: true, message: 'Phone number deleted successfully' });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ success: false, message: 'Failed to delete phone number' });
  }
};
