import React from 'react';

import Header from './components/header/Header.jsx';
import Question from './components/question/Question.jsx';
import Answers from './components/answers/Answers.jsx';
import Description from './components/description/Description.jsx';
import Gameover from './components/gameover/Gameover.jsx';

import './App.scss';

import levels from './data/birds';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.levels = levels;
    this.maxLevel = this.levels.length - 1;
    this.errorsCount = 0;

    this.audioError = new Audio();
    this.audioSuccess = new Audio();

    this.state = {
      currentLevelIndex: -1,
      currentLevel: null,
      question: null,

      answers: [],
      selectedAnswer: null,

      isSuccess: false,
      score: 0,

      isSounds: true,
      isGameOver: false
    };
  }

  componentDidMount() {
    this.audioError.src = './songs/error.mp3';
    this.audioSuccess.src = './songs/success.mp3';
    this.setAnswersAndQuestion()
  }

  stopAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
  }

  setAnswersAndQuestion(level = this.levels[0], levelIndex = 0, args = {}) {
    this.setState({
      ...this.state,
      question: level.answers[Math.floor(Math.random() * level.answers.length)],
      answers: level.answers.map(answer => ({ ...answer, selected: false })),
      currentLevel: level,
      currentLevelIndex: levelIndex,
      ...args
    });
  }

  handlerSelectAnswer = (selectedAnswer) => {
    this.stopAudio(this.audioError);
    this.stopAudio(this.audioSuccess);

    const { answers, question, isSounds, isSuccess, score } = this.state;

    if (isSuccess === true) {
      this.setState({
        ...this.state,
        selectedAnswer: selectedAnswer
      });
      return;
    }

    const _score = {};
    if (selectedAnswer.id !== question.id) { this.errorsCount += 1; this.audioError.play(); }
    else { _score.score = score + ( 5 - this.errorsCount ); this.audioSuccess.play(); }
    
    this.setState({
      ...this.state,
      answers: answers.map(answer => answer.id === selectedAnswer.id ? { ...answer, selected: true } : answer),
      selectedAnswer: selectedAnswer,
      isSuccess: selectedAnswer.id === question.id && isSuccess === false,
      ..._score
    });
    
  }

  restart = () => {
    const level = this.levels[0];
    const levelIndex = 0;
    this.setAnswersAndQuestion(level, levelIndex, {
      selectedAnswer: null,
      isSuccess: false,
      score: 0,
      isGameOver: false
    })
  }

  toNextLevel = () => {
    this.errorsCount = 0;

    const { currentLevelIndex } = this.state;
    if (currentLevelIndex === this.maxLevel) {
      this.setState({
        ...this.state,
        isGameOver: true
      });
      return;
    }

    let levelIndex = currentLevelIndex + 1;
    let level = this.levels[levelIndex];

    this.setAnswersAndQuestion(level, levelIndex, {
      selectedAnswer: null,
      isSuccess: false
    });
  }

  render() {
    const { score, currentLevelIndex, question, answers, selectedAnswer, isSuccess, isSounds, isGameOver } = this.state;

    let content = (
      <div className="content">
        <div className="panel mb-3"><Question question={question} selectAnswer={selectedAnswer} isSuccess={isSuccess} /></div>
        <div className="mb-3 grid">
          <Answers question={question} answers={answers} isSounds={isSounds} onSelectAnswer={this.handlerSelectAnswer} />
          <Description answer={selectedAnswer} />
        </div>
        <button className="next-level-btn" onClick={this.toNextLevel} disabled={!isSuccess}>Next Level</button>
      </div>
    );

    if (isGameOver) {
      content = (
        <div className="container">
          <div className="content">
            <Gameover score={ score } maxScore={ 5 * this.levels.length } restart={this.restart} />
          </div>
        </div>
      )
    };

    return (
      <div className="container">
        <Header levels={levels} currentLevelIndex={currentLevelIndex} score={score} />
        { content }
      </div>
    );
  }
}

export default App;
