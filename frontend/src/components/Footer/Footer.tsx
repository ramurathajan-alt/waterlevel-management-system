import React from 'react';
import './Footer.css';


const Footer: React.FC = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-center">
<div className="footer-content-center">
  <h2>Useful Links</h2>
  <ul>
    <li>
      <a href="https://www.agrimin.gov.lk/" target="_blank" rel="noopener noreferrer">
        Ministry of Agriculture Sri Lanka
      </a>
    </li>
    <li>
      <a href="https://www.waterboard.lk/" target="_blank" rel="noopener noreferrer">
        Water Board Sri Lanka
      </a>
    </li>
    <li>
      <a href="http://www.knowledgebank.irri.org/country-specific/asia/rice-knowledge-for-sri-lanka" target="_blank" rel="noopener noreferrer">
        Rice Knowledge Bank - Sri Lanka
      </a>
    </li>
    <li>
      <a href="https://en.wikipedia.org/wiki/Iranamadu_Tank" target="_blank" rel="noopener noreferrer">
        Iranamadu Tank - Wikipedia
      </a>
    </li>
    <li>
      <a href="https://www.airforce.lk/pages.php?pages=iranmadu" target="_blank" rel="noopener noreferrer">
        Sri Lanka Air Force - Iranamadu
      </a>
    </li>
    <li>
      <a href="https://iesl.lk/SLEN/3//page-1690881.php" target="_blank" rel="noopener noreferrer">
        IESL SLEN Page
      </a>
    </li>
  </ul>
</div>

        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+94-71-363-6156</li>
            <li>contact@IranamaduTank.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        &copy; 2025 WaterLevelStatus.com - All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
