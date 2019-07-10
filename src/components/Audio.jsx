import React from 'react';

const Audio = (props) => {
    const { audio, audioRef } = props;

    return (
        <audio
            ref={audioRef}
            src={audio.file}
            className="audio"
        />
    )
}

export default Audio;