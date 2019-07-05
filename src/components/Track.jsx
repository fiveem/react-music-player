import React from 'react';
import './Track.css';

const Track = (props) => {
    const { title, subtitle, image, active, onClick, activeTrackColor } = props;
    
    return (
        <div className={`track ${active ? "active" : ''}`} style={{ backgroundColor: active && activeTrackColor }} onClick={onClick}>
            <img src={image} alt={title}/>
            <div className="trackInfo">
                <p>{title}</p>
                <p><small>{subtitle}</small></p>
            </div>
        </div>
    )
};

export default Track;