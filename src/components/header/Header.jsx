import React from 'react';

import './Header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { levels, currentLevelIndex, score } = this.props;

    return (
      <header className="header">
        <div className="top-panel">
          <div className="logo">Song<span>Bird</span></div>
          <span className="score">Score: { score }</span>
        </div>
        <ul className="questions-list">
          {levels.map((level, index) => <li className={`questions-list__item ${currentLevelIndex === index ? 'questions-list__item--active' : ''}`} key={level.id}>{level.label}</li>)}
        </ul>
      </header>
    );
  }
}

export default Header;