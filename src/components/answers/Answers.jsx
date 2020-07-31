import React from 'react';
import Toggle from 'react-toggle';

import './Answers.scss';

const Answers = props => {
    const { answers, isSounds } = props;

    const handlerSelectAnswer = (answer) => {
        props.onSelectAnswer(answer)
    }

    const handlerChangeIsSounds = (event) => {
        props.onChangeIsSounds(event.target.checked);
    }

    const selectAnswerClass = (answer) => {
        if (!answer.selected) return '';
        return props.question.id !== answer.id ? 'answers-list__item--error' : 'answers-list__item--success';
    }

    return (
        <div className="answers">
            <label className="toggle-sounds">
                <Toggle
                    defaultChecked={isSounds}
                    icons={false}
                    onChange={handlerChangeIsSounds} />
                <span>Toggle sounds</span>
            </label>
            <ul className="answers-list">
                {answers.map(answer => (
                    <li className={`answers-list__item ${ selectAnswerClass(answer) }`} key={answer.id} onClick={() => handlerSelectAnswer(answer)}>
                        <span className="mark"></span><span>{answer.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Answers;