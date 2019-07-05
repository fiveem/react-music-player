import React from 'react';
import style from './Progress.css';

const Progress = (props) => {
    const { progressContainerRef, progressRef } = props;

    return (
        <div className={style.progressContainer} ref={progressContainerRef}>
            <div className={style.progress} ref={progressRef} />
        </div>
    )
}

export default Progress;