import React from 'react';
import './style.scss';

const Loading = () => {
    return (
        <div className="loading" role="status">
            <div className="spin"></div>
            <div className="message">Loading Data</div>
        </div>
    );
};
export default Loading;