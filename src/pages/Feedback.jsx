import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleRanking = () => {
    const { history } = this.props;
    history.push('/Ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const numberThree = 3;
    return (
      <div data-testid="feedback-text">
        <Header />
        { assertions < numberThree ? <h2>Could be better...</h2> : <h2>Well Done!</h2> }
        <h3>Pontuação total:</h3>
        <p data-testid="feedback-total-score">{score}</p>
        <h3>Numero de acertos:</h3>
        <p
          data-testid="feedback-total-question"
        >
          {assertions}
        </p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};
const mapStateToProps = (globalState) => ({
  assertions: globalState.player.assertions,
  score: globalState.player.score,
});
export default connect(mapStateToProps)(Feedback);
