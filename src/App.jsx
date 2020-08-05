import React from 'react';
import { CSSTransition } from 'react-transition-group';

import Loader from './components/loader/Loader';

import Header from './components/header/Header.jsx';
import Question from './components/question/Question.jsx';
import Answers from './components/answers/Answers.jsx';
import Description from './components/description/Description.jsx';
import Gameover from './components/gameover/Gameover.jsx';

import levelsService from './services/levels.service';

import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.birds = null;
    this.levels = null;
    this.maxLevel = 0;
    this.errorsCount = 0;

    this.audioError = new Audio();
    this.audioSuccess = new Audio();

    this.state = {
      loading: true,

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

  async componentDidMount() {
    const levels = await levelsService.fetchLevels(5, 6);
    this.levels = levels;
    this.maxLevel = levels.length - 1;

    this.audioError.src = './songs/error.mp3';
    this.audioSuccess.src = './songs/success.mp3';
    this.setAnswersAndQuestion(0, {
      loading: false
    });
  }

  stopAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
  }

  setAnswersAndQuestion(levelIndex = 0, args = {}) {
    const level = this.levels[levelIndex];
    const question = level.answers[Math.floor(Math.random() * level.answers.length)];
    console.log(`Level: ${level.label} - Answer: ${question.name}`);

    this.setState({
      ...this.state,
      question,
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
    if (selectedAnswer.id !== question.id) { this.errorsCount += 1; isSounds && this.audioError.play(); }
    else { _score.score = score + ( 5 - this.errorsCount ); isSounds && this.audioSuccess.play(); }
    
    this.setState({
      ...this.state,
      answers: answers.map(answer => answer.id === selectedAnswer.id ? { ...answer, selected: true } : answer),
      selectedAnswer: selectedAnswer,
      isSuccess: selectedAnswer.id === question.id && isSuccess === false,
      ..._score
    });
    
  }

  restart = () => {
    this.setAnswersAndQuestion(0, {
      selectedAnswer: null,
      isSuccess: false,
      score: 0,
      isGameOver: false
    })
  }

  handlerChangeIsSounds = (isSounds) => {
    this.setState({
      ...this.state,
      isSounds
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
    this.setAnswersAndQuestion(levelIndex, {
      selectedAnswer: null,
      isSuccess: false
    });
  }

  render() {
    const { loading, score, currentLevelIndex, question, answers, selectedAnswer, isSuccess, isSounds, isGameOver } = this.state;

    if (loading) return <Loader />;

    let content = (
      <div className="content">
        <div className="mb-3"><Question question={question} selectAnswer={selectedAnswer} isSuccess={isSuccess} /></div>
        <div className="mb-3 grid">
          <Answers question={question} answers={answers} isSounds={isSounds} onChangeIsSounds={this.handlerChangeIsSounds} onSelectAnswer={this.handlerSelectAnswer} />
          <Description answer={selectedAnswer} />
        </div>
        <button className="next-level-btn" onClick={this.toNextLevel} disabled={!isSuccess}>Next Level</button>
      </div>
    );

    if (isGameOver) {
      content = (
        <div className="content">
          <Gameover score={ score } maxScore={ 5 * this.levels.length } restart={this.restart} />
        </div>
      )
    };

    return (
      <CSSTransition
        unmountOnExit
        in={!loading}
        timeout={{ appear: 0, enter: 0, exit: 1000 }}
        classNames='container'
        appear
      >
        <div className="container">
          <Header levels={this.levels} currentLevelIndex={currentLevelIndex} score={score} />
          { content }
        </div>
      </CSSTransition>
    );
  }
}

export default App;
