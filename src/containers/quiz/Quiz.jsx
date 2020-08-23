import React from 'react';

import Header from '../../components/Header/Header.jsx';
import Question from '../../components/Question/Question.jsx';
import Answers from '../../components/Answers/Answers.jsx';
import Description from '../../components/Description/Description.jsx';
import Gameover from '../../components/GameOver/GameOver.jsx';

import './Quiz.scss';

class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.labels = [];
    this.maxLevel = 0;
    this.errorsCount = 0;

    this.audioError = new Audio();
    this.audioSuccess = new Audio();

    this.state = {
      currentLevelIndex: 0,
      question: null,

      answers: [],
      selectedAnswer: null,
      score: 0,

      isSuccess: false,
      isGameOver: false
    };
  }

  async componentDidMount() {
    this.labels = this.props.levels.map(level => level.label);
    this.maxLevel = this.props.levels.length - 1;

    this.audioError.src = './songs/error.mp3';
    this.audioSuccess.src = './songs/success.mp3';
    this.setAnswersAndQuestion();
  }

  stopAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
  }

  setAnswersAndQuestion(args = {}) {
    const level = this.props.levels[args.currentLevelIndex || this.state.currentLevelIndex];
    const question = level.answers[Math.floor(Math.random() * level.answers.length)];
    console.log(`Level: ${level.label} - Answer: ${question.name}`);

    this.setState({
      ...this.state,
      question,
      answers: level.answers.map(answer => ({ ...answer, selected: false })),
      ...args
    });
  }

  handlerSelectAnswer = selectedAnswer => {
    this.stopAudio(this.audioError);
    this.stopAudio(this.audioSuccess);

    const { answers, question, score: oldScore, isSuccess } = this.state;
    const { isSounds } = this.props;

    if (isSuccess === true) {
      this.setState({
        ...this.state,
        selectedAnswer
      });
      return;
    }

    let score = oldScore;
    if (selectedAnswer.id !== question.id) { this.errorsCount += 1; isSounds && this.audioError.play(); }
    else { score += (answers.length - 1) - this.errorsCount; isSounds && this.audioSuccess.play(); }
    
    this.setState({
      ...this.state,
      answers: answers.map(answer => answer.id === selectedAnswer.id ? { ...answer, selected: true } : answer),
      selectedAnswer,
      score,
      isSuccess: selectedAnswer.id === question.id && isSuccess === false,
    });
    
  }

  restart = () => {
    this.setAnswersAndQuestion({
      currentLevelIndex: 0,
      selectedAnswer: null,
      score: 0,
      isSuccess: false,
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

    this.setAnswersAndQuestion({
      selectedAnswer: null,
      isSuccess: false,
      currentLevelIndex: currentLevelIndex + 1
    });
  }

  render() {
    const { currentLevelIndex, question, answers, selectedAnswer, score, isSuccess, isGameOver } = this.state;
    const { actions, isSounds, levels } = this.props;

    let content = (
      <div className="content">
        <div className="mb-3"><Question question={question} isSuccess={isSuccess} /></div>
        <div className="mb-3 grid">
          <Answers actions={actions} question={question} answers={answers} isSounds={isSounds} onSelectAnswer={this.handlerSelectAnswer} />
          <Description answer={selectedAnswer} />
        </div>
        <button className="next-level-btn" onClick={this.toNextLevel} disabled={!isSuccess}>Next Level</button>
      </div>
    );

    if (isGameOver) {
      content = (
        <div className="content">
          <Gameover score={ score } maxScore={ (answers.length - 1) * levels.length } restart={this.restart} />
        </div>
      )
    };

    return (
        <div className="quiz">
            <Header labels={this.labels} currentLevelIndex={currentLevelIndex} score={score} />
            { content }
        </div>
    );
  }
}

export default Quiz;
