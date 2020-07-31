import React from 'react';
import AudioPlayer from 'react-h5-audio-player';

import './Description.scss';

const Description = props => {
    const { answer } = props;

    if (!answer) return (
        <div className="description"><div className="instruction"><span>Послушайте плеер.</span><span>Выберите птицу из списка.</span></div></div>
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