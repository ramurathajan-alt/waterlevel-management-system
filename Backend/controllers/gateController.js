import Gate from '../models/Gate.js';

// Get all gates (formatted for public portal)
export const getGates = async (req, res) => {
  try {
    const gates = await Gate.find();

    const formatted = gates.map(gate => ({
      id: gate._id,
      name: gate.name,
      status: gate.status,
      waterLevel: Math.round(gate.waterLevel),
      waterLevelFt: gate.waterLevelFt,
      waterLevelState: gate.waterLevelState,
      location: gate.location || 'Unknown',
      irrigationSchedule: gate.irrigationSchedule || 'Not scheduled',
      lastUpdated: gate.updatedAt
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gates' });
  }
};

// Create a new gate
export const createGate = async (req, res) => {
  const { name, waterLevel = 0, status = 'closed', location, irrigationSchedule } = req.body;

  const waterLevelFt = (waterLevel / 100) * 34;
  let state = 'Low';
  if (waterLevel >= 80) state = 'Critical';
  else if (waterLevel >= 60) state = 'High';
  else if (waterLevel >= 20) state = 'Normal';

  try {
    const newGate = new Gate({
      name,
      waterLevel,
      waterLevelFt: parseFloat(waterLevelFt.toFixed(1)),
      status,
      waterLevelState: state,
      location,
      irrigationSchedule
    });

    await newGate.save();
    res.status(201).json(newGate);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create gate' });
  }
};

// Update water level
export const updateGateWaterLevel = async (req, res) => {
  const { gateId, waterLevel } = req.body;

  try {
    const gate = await Gate.findById(gateId);
    if (!gate) return res.status(404).json({ error: 'Gate not found' });

    const waterLevelFt = (waterLevel / 100) * 34;
    let state = 'Low';
    if (waterLevel >= 80) state = 'Critical';
    else if (waterLevel >= 60) state = 'High';
    else if (waterLevel >= 20) state = 'Normal';

    gate.waterLevel = waterLevel;
    gate.waterLevelFt = parseFloat(waterLevelFt.toFixed(1));
    gate.waterLevelState = state;

    await gate.save();
    res.json({ message: 'Water level updated', gate });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update water level' });
  }
};

// Toggle gate status
export const toggleGateStatus = async (req, res) => {
  const { gateId } = req.body;

  try {
    const gate = await Gate.findById(gateId);
    if (!gate) return res.status(404).json({ error: 'Gate not found' });

    gate.status = gate.status === 'open' ? 'closed' : 'open';
    await gate.save();

    res.json({ message: 'Gate status updated', gate });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update gate status' });
  }
};
