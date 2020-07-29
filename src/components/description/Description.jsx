import React from 'react';
import AudioPlayer from 'react-h5-audio-player';

import './Description.scss';

class Description extends React.Component {
    constructor(props) {
        super(props);

        this.player = React.createRef()
    }

    componentWillUpdate(props) {
        const audio = this.player?.current?.audio.current;

        if (audio && audio.src) audio.pause();
    }
    
    render() {
        const { answer } = this.props;

        return (
            <div className="description">
                {!answer ? (<div className="instruction"><span>Послушайте плеер.</span><span>Выберите птицу из списка</span></div>) : (
                    <div className="bird-info">
                        <img src={answer.image} alt={answer.species} className="bird-info__img" />
                        <div className="bird-info__meta">
                            <h2 className="bird-info__name">{ answer.name }</h2>
                            <span className="bird-info__species">{ answer.species }</span>
                            <AudioPlayer
                                autoPlayAfterSrcChange={false}
                                ref={this.player}
                                className="audio-player"
                                src={ answer?.audio }
                                showJumpControls={false}
                                customAdditionalControls={[]}
                                customVolumeControls={[]}
                            />
                        </div>
                        <p className="bird-info__description">{ answer.description }</p>
                    </div>
                )}
            </div>
        )
    }
}

export default Description;