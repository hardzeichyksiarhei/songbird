import React from 'react';

import './QuizError.scss';

const QuizError = props => {
    const { className } = props;

    return (
        <div className={'quiz-error ' + className}>
            <h3 className="quiz-error__title">Error!</h3>
            <p className="quiz-error__message">Ooops! Something went wrong...</p>
        </div>
    );
}

export default QuizError;