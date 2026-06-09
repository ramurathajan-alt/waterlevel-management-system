import axios from 'axios';
import VerifiedNumber from '../models/SmsNumber.js';
import Alert from '../models/Alert.js';
import Gate from '../models/Gate.js';

const formatOpenMessage = (gate, time, lang) => {
  if (lang === 'tamil') {
    return `⚠️ எச்சரிக்கை: ${gate.name} வாயில் ${time} மணிக்கு திறக்கப்பட்டுள்ளது.

நிலை: ${gate.status}
நீர் நிலை: ${gate.waterLevel}% (${gate.waterLevelFt} அடிகள்)
நிலையின் நிலை: ${gate.waterLevelState}`;
  } else {
    return `⚠️ ALERT: ${gate.name} gate has been OPENED at ${time}.

Status: ${gate.status}
Water Level: ${gate.waterLevel}% (${gate.waterLevelFt} ft)
Level State: ${gate.waterLevelState}`;
  }
};

const formatCloseMessage = (gate, time, lang) => {
  if (lang === 'tamil') {
    return `ℹ️ தகவல்: ${gate.name} வாயில் ${time} மணிக்கு மூடப்பட்டுள்ளது.

நிலை: ${gate.status}
நீர் நிலை: ${gate.waterLevel}% (${gate.waterLevelFt} அடிகள்)
நிலையின் நிலை: ${gate.waterLevelState}`;
  } else {
    return `ℹ️ INFO: ${gate.name} gate has been CLOSED at ${time}.

Status: ${gate.status}
Water Level: ${gate.waterLevel}% (${gate.waterLevelFt} ft)
Level State: ${gate.waterLevelState}`;
  }
};

export const sendGateStatusSmsAlert = async (req, res) => {
  try {
    const { time } = req.body;
    const lang = req.params.lang?.toLowerCase() || 'english';
    const type = req.params.type?.toLowerCase() || 'open';

    if (!time) {
      return res.status(400).json({ success: false, message: 'Time is required' });
    }

    const verifiedNumbers = await VerifiedNumber.find({});
    if (verifiedNumbers.length === 0) {
      return res.status(400).json({ success: false, message: 'No verified numbers found' });
    }

    const gate = await Gate.findOne({ name: 'Main Gate' });
    if (!gate) {
      return res.status(404).json({ success: false, message: 'Main Gate not found' });
    }

    const message =
      type === 'open'
        ? formatOpenMessage(gate, time, lang)
        : formatCloseMessage(gate, time, lang);

    const smsResponse = await axios.post(
      'https://app.text.lk/api/v3/sms/send',
      {
        recipient: verifiedNumbers.map(num => num.phoneNumber).join(','),
        sender_id: process.env.TEXTLK_SENDER_ID,
        type: 'plain',
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TEXTLK_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (smsResponse.data?.status !== 'success') {
      return res.status(500).json({ success: false, message: 'Failed to send SMS alert' });
    }

    await Alert.create({
      message,
      recipients: verifiedNumbers.map(num => num.phoneNumber),
    });

    res.json({ success: true, message: 'Gate alert sent successfully' });
  } catch (error) {
    console.error('SMS Alert Error:', error.response?.data || error.message);
    res.status(500).json({ success: false, message: 'Failed to send SMS alert' });
  }
};
