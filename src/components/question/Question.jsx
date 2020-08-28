import React, { useRef, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import Blur from 'react-blur';

import './Question.scss';

const Question = props => {
    const { question, isSuccess } = props;
    const player = useRef(null);

    useEffect( () => {
        const audio = player?.current?.audio.current;

        if (audio && audio.src && isSuccess) audio.pause();
    }, [isSuccess] );

    return (
        <div className="question">
            <Blur className="question__img" img={question?.image ?? ''} blurRadius={ isSuccess ? 0 : 50 } />
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