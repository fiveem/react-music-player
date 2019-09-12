import React from 'react';
import style from './Track.css';

const Track = (props) => {
    const { title, subtitle, image, active, onClick, activeTrackColor } = props;
    
    return (
        <div className={`${style.track} ${active ? style.active : ''}`} style={{ backgroundColor: active && activeTrackColor }} onClick={onClick}>
            <div className={style.trackImage} style={{ backgroundImage: `url(${image})`}}/>
            <div className={style.trackInfo}>
                <p>{title}</p>
                <p><small>{subtitle}</small></p>
            </div>
        </div>
    )
};

export default Track;