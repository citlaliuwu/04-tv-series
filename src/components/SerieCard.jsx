import { Link } from 'react-router-dom';
import { useState } from 'react';


const SerieCard = ({ id, name, image, summary, officialSite }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className='col-md-4 my-4 serie-card-container'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='serie-card'>
        <Link to={`/serie/${id}`}>
          <div className='image-container'>
            <img className='serie-image' src={image.original} alt={name} />
            {isHovered && (
              <div className='overlay'>
                <span className='serie-name'>{name}</span>
              </div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SerieCard;
