import React, { useState } from 'react';
import './Card.css'; 

const Card = ({ coverImage, image, text }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
    };

    return (
        <div className="card" onClick={handleClick}>
            <img src={coverImage} alt={text} className="card-image" />
            <div className="card-text">{text}</div>

            {isOpen && (
                <div className="popup" onClick={closePopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={closePopup}>
                            &times;
                        </button>
                        <img src={image} alt={text} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;
