import React from 'react';
import './MapEmbed.css'; // Import the CSS file

const MapEmbed: React.FC = () => {
  return (
    <section className="map-section">
      <h2 className="map-title">Location: Iranaimadu Tank</h2>
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d32955.09364137214!2d80.41078382366375!3d9.317584267318109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afe95f045e72365%3A0x5a1309c554b2fcd9!2zSXJhbmFpbWFkdSBUYW5rIOCuh-CusOCuo-CviOCuruCun-CvgSDgrpXgr4HgrrPgrq7gr40!5e1!3m2!1sen!2slk!4v1746530024904!5m2!1sen!2slk"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Irranaimadu Tank Map"
        ></iframe>
      </div>
    </section>
    
  );
};

export default MapEmbed;
