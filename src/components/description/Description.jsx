import React from 'react';
import AudioPlayer from 'react-h5-audio-player';

import './Description.scss';

const Description = props => {
    const { answer } = props;

    if (!answer) return (
        <div className="description">
            <ul className="instruction">
                <li>
                    <span>1. Listen to the player.</span>
                    <img src="./player.png" alt="Player"/>
                </li>
                <li>
                    <span>2. Select a bird from the list.</span>
                    <img src="./answers.png" alt="answers"/>
                </li>
            </ul>
        </div>
    );

    return (
        <div className="description">
           <div className="bird-info">
                <img src={answer.image} alt={answer.species} className="bird-info__img" />
                <div className="bird-info__meta">
                    <h2 className="bird-info__name">{ answer.name }</h2>
                    <span className="bird-info__species">{ answer.species }</span>
                    <AudioPlayer
                        autoPlayAfterSrcChange={false}
                        className="audio-player"
                        src={ answer?.audio }
                        showJumpControls={false}
                    />
                </div>
                <p className="bird-info__description">{ answer.description }</p>
            </div>
        </div>
    )
}

export default Description;