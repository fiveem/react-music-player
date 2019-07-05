import React from 'react';
import './Progress.css';

const Progress = (props) => {
    const { progressContainerRef, progressRef } = props;

    return (
        <div className="progressContainer" ref={progressContainerRef}>
            <div className="progress" ref={progressRef} />
        </div>
    )
}

export default Progress;