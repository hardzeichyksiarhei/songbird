import React from 'react';

import './Header.scss';

const Header = props => {
  const { levels, currentLevelIndex, score } = props;

    return (
      <header className="header">
        <div className="top-panel">
          <div className="logo"><img className="logo__img" src="./logo.svg" alt="SongBird"/>Song<span>Bird</span></div>
          <span className="score">Score: { score }</span>
        </div>
        <ul className="questions-list">
          {levels.map((level, index) => <li className={`questions-list__item ${currentLevelIndex === index ? 'questions-list__item--active' : ''}`} key={level.id}>{level.label}</li>)}
        </ul>
      </header>
    );
}

export default Header;