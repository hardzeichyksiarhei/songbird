import React from 'react';

import './Header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { levels, currentLevelIndex, score } = this.props;

    return (
      <header class="header">
        <div class="top-panel">
          <div class="logo">Song<span>Bird</span></div>
          <span class="score">Score: { score }</span>
        </div>
        <ul class="questions-list">
          {levels.map((level, index) => <li className={`questions-list__item ${currentLevelIndex === index ? 'questions-list__item--active' : ''}`}>{ level.label }</li>)}
        </ul>
      </header>
    );
  }
}

export default Header;