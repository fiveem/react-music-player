import React from 'react';
import './Progress.css';

export default class Progress extends React.Component {
    render() {
        const { progressContainerRef, progressRef } = this.props;

        return (
            <div className="progressContainer" ref={progressContainerRef}>
                <div className="progress" ref={progressRef} />
            </div>
        )

    }
}