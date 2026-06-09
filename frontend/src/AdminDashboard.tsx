import { useState } from 'react';
import './AdminDashboard.css';
import Verified from './components/Verified/Verified';
import ConfirmationDialog from './components/ConfirmationDialog/ConfirmationDialog';
import SmsAlert from './components/SmsAlert/SmsAlert';
import CreateAdminPopup from './components/CreateAdminPopup/CreateAdminPopup';
import AdminHeader from './components/Header/AdminHeader';

type Gate = {
  _id: string;
  name: string;
  status: 'open' | 'closed';
  waterLevel: number;
  waterLevelFt: number;
  waterLevelState: string;
};

const AdminDashboard = () => {
  const [gates, setGates] = useState<Gate[]>([{
    _id: '6828388ad3597a23617feac1',
    name: 'Main Gate',
    status: 'closed',
    waterLevel: 20,
    waterLevelFt: 6.8,
    waterLevelState: 'Normal',
  }]);

  const [confirmingGateAction, setConfirmingGateAction] = useState<{
    gateId: string;
    action: 'open' | 'close';
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [showCreateAdminPopup, setShowCreateAdminPopup] = useState(false);

  const toggleGateStatus = async (gateId: string) => {
    try {
      const response = await fetch('http://localhost:4000/api/gates/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gateId }),
      });

      if (!response.ok) throw new Error('Failed to toggle gate status');

      const data = await response.json();

      setGates(prev =>
        prev.map(gate =>
          gate._id === gateId ? { ...gate, status: data.gate.status } : gate
        )
      );

      setConfirmingGateAction(null);
    } catch (error) {
      console.error('Error toggling gate status:', error);
    }
  };

  const getWaterLevelState = (level: number): string => {
    if (level > 80) return 'Critical';
    if (level > 60) return 'High';
    if (level < 20) return 'Low';
    return 'Normal';
  };

  const refreshData = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateGateLevel = async (gateId: string, newLevelPercent: number) => {
    const waterLevelFt = (newLevelPercent / 100) * 34;
    const waterLevelState = getWaterLevelState(newLevelPercent);

    setGates(prev =>
      prev.map(gate =>
        gate._id === gateId
          ? { ...gate, waterLevel: newLevelPercent, waterLevelFt, waterLevelState }
          : gate
      )
    );

    try {
      const response = await fetch('http://localhost:4000/api/gates/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gateId,
          waterLevel: newLevelPercent,
        }),
      });

      if (!response.ok) throw new Error('Failed to update water level');
    } catch (error) {
      console.error('Error updating level:', error);
    }
  };

  return (
    <div className='admin-dashboard'>
      <AdminHeader
        isLoading={isLoading}
        onRefresh={refreshData}
        onCreateAdmin={() => setShowCreateAdminPopup(true)}
      />

      <section className='gate-status-section'>
        <h2 className='section-title'>Current Status</h2>
        <div className='gates-container'>
          {gates.map(gate => (
            <div key={gate._id} className='gate-card'>
              <div className='gate-side-left'>
                <h3 className='gate-name'>{gate.name}</h3>
                <p className={`gate-status ${gate.status}`}>Status: {gate.status}</p>
              </div>
              <div className='gate-side-center'>
                <p>({gate.waterLevel.toFixed(0)}%)</p>
                <p className={`level-status ${gate.waterLevelState.toLowerCase()}`}>
                  Status: {gate.waterLevelState}
                </p>
              </div>
              <div className='gate-side-right'>
                <div className='gate-level-input'>
                  <label>Water Level (ft)</label>
                  <input
                    className='level-input'
                    type="number"
                    min="0"
                    max="34"
                    value={gate.waterLevelFt.toFixed(1)}
                    onChange={(e) => {
                      const ft = parseFloat(e.target.value);
                      if (!isNaN(ft) && ft >= 0 && ft <= 34) {
                        const percent = (ft / 34) * 100;
                        updateGateLevel(gate._id, percent);
                      }
                    }}
                  />
                  <button
                    className='gate-action-button'
                    onClick={() =>
                      setConfirmingGateAction({ gateId: gate._id, action: gate.status === 'open' ? 'close' : 'open' })
                    }
                  >
                    {gate.status === 'open' ? 'Close Gate' : 'Open Gate'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {confirmingGateAction && (
        <ConfirmationDialog
          action={confirmingGateAction.action}
          onCancel={() => setConfirmingGateAction(null)}
          onConfirm={() => toggleGateStatus(confirmingGateAction.gateId)}
        />
      )}

      <SmsAlert />
      <Verified />
      {showCreateAdminPopup && (
        <CreateAdminPopup onClose={() => setShowCreateAdminPopup(false)} />
      )}
    </div>
  );
};

export default AdminDashboard;
