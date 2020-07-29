import React from 'react';
import Toggle from 'react-toggle';

import './Answers.scss';

class Answers extends React.Component {
    constructor(props) {
        super(props);
    }

    selectAnswer = (answer) => {
        this.props.onSelectAnswer(answer)
    }

    handlerChangeIsSounds = (event) => {
        this.props.onChangeIsSounds(event.target.checked);
    }

    selectAnswerClass = (answer) => {
        if (!answer.selected) return '';
        return this.props.question.id !== answer.id ? 'answers-list__item--error' : 'answers-list__item--success';
    }
    
    render() {
        const { answers, isSounds } = this.props;

        return (
            <div className="answers">
                <label className="toggle-sounds">
                    <Toggle
                        defaultChecked={isSounds}
                        icons={false}
                        onChange={this.handlerChangeIsSounds} />
                    <span>Toggle sounds</span>
                </label>
                <ul className="answers-list">
                    {answers.map(answer => (
                        <li className={`answers-list__item ${ this.selectAnswerClass(answer) }`} key={answer.id} onClick={() => this.selectAnswer(answer)}>
                            <span className="mark"></span><span>{answer.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Answers;