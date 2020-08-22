import React from 'react';
import Toggle from 'react-toggle';

import './Answers.scss';

const Answers = props => {
    const { answers, isSounds } = props;

    const handlerSelectAnswer = (answer) => {
        props.onSelectAnswer(answer)
    }

    const handlerChangeIsSounds = _ => {
        props.actions.toggleSounds();
    }

    const getAnswerClass = (answer) => {
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
                    <li className={`answers-list__item ${ getAnswerClass(answer) }`} key={answer.id} onClick={() => handlerSelectAnswer(answer)}>
                        <span className="mark"></span><span>{answer.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Answers;