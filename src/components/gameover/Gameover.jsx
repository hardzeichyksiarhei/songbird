import React from 'react';

import './Gameover.scss';

class Gameover extends React.Component {
    constructor(props) {
        super(props);

        this.audioAbsoluteWin = new Audio();
    }

    componentDidMount() {        
        if (this.props.score === this.props.maxScore) {
            this.audioAbsoluteWin.src = './songs/absolute-win.mp3';
            this.audioAbsoluteWin.play();
        }
    }

    componentWillUnmount() {
        this.audioAbsoluteWin.pause();
        this.audioAbsoluteWin.src = '';
    }

    render() {
        const { score, maxScore, restart } = this.props;

        return (
            <div className="gameover">
                <div className="gameover__title">Поздравляем!</div>
                <p className="gameover__stats">Вы прошли викторину и набрали <span>{ score }</span> из <span>{ maxScore }</span> возможных баллов</p>
                <button className="gameover__reset" onClick={restart}>{  score < maxScore ? 'Упс! Попробовать еще раз' : 'Начать заново' }</button>
            </div>
        )
    }
}

export default Gameover;