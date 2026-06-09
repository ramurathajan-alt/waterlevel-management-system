import React from 'react';
import './BenefitsSection.css'; // If using standard CSS
import IrrigationImg1 from '../../assets/noun-agriculture-7860675.png'; 
import IrrigationImg2 from '../../assets/noun-watering-can-4036300.png'; 
import IrrigationImg3 from '../../assets/noun-wave-pattern-1655656.png'; 

const benefits = [
  {
   imagesvg: IrrigationImg1,
    title: 'Improve Irrigation Efficiency',
    description:
      'Understand how much water your crops are using and optimize scheduling.',
  },
  {
    imagesvg: IrrigationImg2,
    title: 'Protect Against Flooding',
    description:
      'Get alerts before water levels rise to dangerous levels.',
  },
  {
    imagesvg: IrrigationImg3,
    title: 'Make Better Decisions',
    description:
      'Use real-time data to guide farm management and compliance.',
  },
];

const BenefitsSection: React.FC = () => {
  return (
    <section className="benefits-section">
      <h2 className="benefits-title">Benefits of Monitoring Water Level</h2>
      <div className="benefits-grid">
        {benefits.map((benefit, index) => (
          <div key={index} className="benefit-card">
            <div>
              <img src={benefit.imagesvg} alt={benefit.title} className="benefit-image" />
            </div>
            <div>
             <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-description">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
