import React from 'react';
import AudioPlayer from 'react-h5-audio-player';

import './Question.scss';

class Question extends React.Component {
    constructor(props) {
        super(props);

        this.player = React.createRef()
    }

    componentWillUpdate(props) {
        const audio = this.player?.current?.audio.current;

        if (audio && audio.src && props.isSuccess) audio.pause();
    }
    
    render() {
        const { question, isSuccess } = this.props;

        return (
            <div className="question">
                <img src={ isSuccess ? question.image : './bird.jpg' } alt="" className="question__img"/>
                <div className="question__content">
                    <h2 className="question__name">{ isSuccess ? question.name : '******' }</h2>
                    <AudioPlayer
                        autoPlayAfterSrcChange={false}
                        ref={this.player}
                        className="audio-player"
                        src={ question?.audio }
                        showJumpControls={false}
                    />
                </div>
            </div>
        )
    }
}

export default Question;