import React, { useRef, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';

import './Question.scss';

const Question = props => {
    const { question, isSuccess } = props;
    const player = useRef(null);

    useEffect( () => {
        const audio = player?.current?.audio.current;

        if (audio && audio.src && props.isSuccess) audio.pause();
    }, [] );

    return (
        <div className="question">
            <img src={ isSuccess ? question.image : './bird.jpg' } alt="" className="question__img"/>
            <div className="question__content">
                <h2 className="question__name">{ isSuccess ? question.name : '******' }</h2>
                <AudioPlayer
                    autoPlayAfterSrcChange={false}
                    ref={player}
                    className="audio-player"
                    src={ question?.audio }
                    showJumpControls={false}
                />
            </div>
        </div>
    )
}

export default Question;