import React from 'react';

import Header from './components/header/Header.jsx';

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

  render() {
    const { score, currentLevelIndex, question, answers, selectedAnswer, isSuccess, isSounds, isGameOver } = this.state;

    return (
      <div className="container">
        <Header levels={levels} currentLevelIndex={currentLevelIndex} score={score} />
      </div>
    );
  }
}

export default App;
