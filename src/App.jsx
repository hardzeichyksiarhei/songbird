import React from 'react';
import { CSSTransition } from 'react-transition-group';

import Loader from './components/loader/Loader';
import Quiz from './components/quiz/Quiz.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from "./store/actions";

import { NUMBER_OF_LEVELS, NUMBER_OF_ANSWERS } from './config';

import './App.scss';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchLevels(NUMBER_OF_LEVELS, NUMBER_OF_ANSWERS));
  }

  render() {
    const { isSounds, loading, levels } = this.props;

    if (loading) return <Loader />;

    let boundActions = bindActionCreators(actions, this.props.dispatch);
    return (
      <CSSTransition
        unmountOnExit
        in={!loading}
        timeout={{ appear: 0, enter: 0, exit: 1000 }}
        classNames='container'
        appear
      >
        <div className="container">
          <Quiz
            actions={boundActions}
            levels={levels}
            isSounds={isSounds}
          />
        </div>
      </CSSTransition>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSounds: state.app.isSounds,
    levels: state.levels.levels,
    loading: state.levels.loading,
    error: state.levels.error
  }
}

export default connect(mapStateToProps, null)(App);
