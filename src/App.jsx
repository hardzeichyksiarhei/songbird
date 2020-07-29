import React from 'react';

import Header from './components/header/Header.jsx';
import Question from './components/question/Question.jsx';

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

  render() {
    const { score, currentLevelIndex, question, answers, selectedAnswer, isSuccess, isSounds, isGameOver } = this.state;

    let content = (
      <div className="content">
        <div className="panel mb-3"><Question question={question} selectAnswer={selectedAnswer} isSuccess={isSuccess} /></div>
      </div>
    );

    return (
      <div className="container">
        <Header levels={levels} currentLevelIndex={currentLevelIndex} score={score} />
        { content }
      </div>
    );
  }
}

export default App;
