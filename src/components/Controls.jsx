import React from 'react';
import style from './Controls.css';

const Controls = (props) => {
    const {
            playlistLength,
            activeTrack,
            onPlayClicked,
            onPauseClicked,
            onPreviousClicked,
            onNextClicked,
            showPauseButton,
            activeButtonColor,
            inactiveButtonColor,
            buttonTextColor
        } = props;

    return (
        <div className={style.controlsContainer}>
            {playlistLength === 0 || activeTrack === 0 ?
                <button className={`${style.roundButton} ${style.inactive}`} style={{ backgroundColor: inactiveButtonColor, color: buttonTextColor }}>
                    <i className="fa fa-backward" />
                </button>
                :
                <button className={style.roundButton} onClick={onPreviousClicked} style={{ backgroundColor: activeButtonColor, color: buttonTextColor }}>
                    <i className="fa fa-backward" />
                </button>   
            }
            {showPauseButton ?
                <button className={`${style.roundButton} ${style.active}`} onClick={onPauseClicked} style={{ backgroundColor: activeButtonColor, color: buttonTextColor }}>
                    <i className="fa fa-pause" />
                </button>
                :
                <button className={`${style.roundButton} ${style.active}`} onClick={onPlayClicked} style={{ backgroundColor: activeButtonColor, color: buttonTextColor }}>
                    <i className="fa fa-play" />
                </button>
            }
            {playlistLength === 0 || activeTrack === playlistLength - 1 ?
                <button className={`${style.roundButton} ${style.inactive}`} style={{ backgroundColor: inactiveButtonColor, color: buttonTextColor }}>
                    <i className="fa fa-forward" />
                </button>
                :
                <button className={style.roundButton} onClick={onNextClicked} style={{ backgroundColor: activeButtonColor, color: buttonTextColor }}>
                    <i className="fa fa-forward" />
                </button>
            }
        </div>
    )
}

export default Controls;