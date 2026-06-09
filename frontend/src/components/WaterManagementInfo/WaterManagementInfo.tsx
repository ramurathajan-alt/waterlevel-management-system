import React from 'react';
import './WaterManagementInfo.css';

const WaterManagementInfo: React.FC = () => {
  return (
    <section className="water-info-section">
      <h2 className="section-title">Water Management Information</h2>
      <div className="section-content">
        <p>
          This portal provides real-time information about water levels and gate statuses in our regional water management system.
          The data is updated regularly to ensure accurate information is available to the public.
        </p>
        <p className="subheading"><strong>Water Level Indicators:</strong></p>
        <ul className="indicator-list">
          <li><span className="level normal">Normal</span>: 20–60%</li>
          <li><span className="level high">High</span>: 60–80%</li>
          <li><span className="level critical">Critical</span>: Above 80% (Flood Risk)</li>
          <li><span className="level low">Low</span>: Below 20% (Drought Risk)</li>
        </ul>
      </div>
    </section>
  );
};

export default WaterManagementInfo;
