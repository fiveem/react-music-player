import React from 'react';
import './Controls.css';

export default class Controls extends React.Component {

    render() {
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
            } = this.props;

        return (
            <div className="controlsContainer">
                {playlistLength === 0 || activeTrack === 0 ?
                    <button className="roundButton inactive" style={{ backgroundColor: inactiveButtonColor, color: buttonTextColor }}>
                        <i className="fa fa-backward" />
                    </button>
                    :
                    <button className="roundButton" onClick={onPreviousClicked} style={{ backgroundColor: activeButtonColor, color: buttonTextColor }}>
                        <i className="fa fa-backward" />
                    </button>   
                }
                {showPauseButton ?
                    <button className="roundButton active" onClick={onPauseClicked} style={{ backgroundColor: activeButtonColor, color: buttonTextColor }}>
                        <i className="fa fa-pause" />
                    </button>
                    :
                    <button className="roundButton active" onClick={onPlayClicked} style={{ backgroundColor: activeButtonColor, color: buttonTextColor }}>
                        <i className="fa fa-play" />
                    </button>
                }
                {playlistLength === 0 || activeTrack === playlistLength - 1 ?
                    <button className="roundButton inactive" style={{ backgroundColor: inactiveButtonColor, color: buttonTextColor }}>
                        <i className="fa fa-forward" />
                    </button>
                    :
                    <button className="roundButton" onClick={onNextClicked} style={{ backgroundColor: activeButtonColor, color: buttonTextColor }}>
                        <i className="fa fa-forward" />
                    </button>
                }
            </div>
        )
    }
}