import React from 'react';
import tankImage from '../../assets/tank1.jpg'; 
import tankImage2 from '../../assets/tank3.jpg';
import './IranamaduTank.css';

const IranamaduTank: React.FC = () => {
  return (
    <div className="iranamadu-wrapper">
      <div className="iranamadu-section">
            <div>
                <img src={tankImage} alt="Iranamadu Tank History" className="iranamadu-image" />
            </div>
            <div className="iranamadu-text">
                <h2>History of Iranamadu</h2>
                <p>
                 The Iranamadu Tank, located on the Kanakarayan Aru in northern Sri Lanka, was first proposed in 1902 by H. T. S. Ward, the Director of Irrigation. Construction began in July of that year, aiming to build a reservoir with a 227 sq mi (588 km²) catchment area and a capacity to hold 26 ft (8 m) of water. The project faced delays due to World War I but was eventually completed in 1921 and filled by November of the same year, at a cost of Rs. 194,000. Constructed manually by connecting two low-lying swamps, the tank was named from the Tamil words "iranai" (two) and "madu" (pond). During the 1940s drought, many settlers from the Jaffna islands relocated to Kilinochchi and were given land near the tank for farming.
                </p>
            </div>
        </div>

      <div className="iranamadu-section">
      <div className="iranamadu-text2">
          <p>
            To meet increasing irrigation demands, the bund (embankment) was successively raised over the decades: to 30 ft in 1951, 32 ft in 1954, and 34 ft in 1975, raising its storage capacity from 71,000 to 106,500 acre⋅ft. By the late 1960s, the tank had a water spread area of 5,750 acres and could irrigate over 18,000 acres of farmland.
            However, concerns about the bund’s stability during the 1983 monsoon led to a 1984 directive restricting water levels to a maximum of 32 ft. By 2012, the tank spanned 10 km in length and 2 km in width, supporting irrigation for 20,882 acres through a 32 km canal system—a number that increased to 21,985 acres by 2014.
          </p>
        </div>
        <div>
            <img src={tankImage2} alt="Iranamadu Tank Expansion" className="iranamadu-image2" />
        </div>

      </div>
    </div>
  );
};

export default IranamaduTank;
