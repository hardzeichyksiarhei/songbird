import React from 'react';

import './Loader.scss';

const Loader = props => {
    return (
        <div className="loader-wrapper">
            <div className="bird-loader">
                <div className="bird-loader__lowerLip"></div>
                <div className="bird-loader__crest"></div>
                <div className="bird-loader__face"></div>
                <div className="bird-loader__cheek"></div>
                <div className="bird-loader__eye"></div>
                <div className="bird-loader__upperLip"></div>
            </div>    
        </div>
    )
}

export default Loader;