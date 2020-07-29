import React from 'react';

import './Gameover.scss';

class Gameover extends React.Component {
    constructor(props) {
        super(props);

        this.audioAbsoluteWin = new Audio();
    }

    componentWillMount() {        
        if (this.props.score === this.props.maxScore) {
            this.audioAbsoluteWin.src = './songs/absolute-win.mp3';
            this.audioAbsoluteWin.play();
        }
    }

    render() {
        const { score, maxScore, restart } = this.props;

        return (
            <div className="gameover">
                <div className="gameover__title">Поздравляем!</div>
                <p className="gameover__stats">Вы прошли викторину и набрали <span>{ score }</span> из <span>{ maxScore }</span> возможных баллов</p>
                { score < maxScore ? <button className="gameover__reset" onClick={restart}>Попробовать еще раз!</button> : '' } 
            </div>
        )
    }
}

export default Gameover;