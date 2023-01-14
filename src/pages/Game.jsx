import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { addAssertions, addTotalScore, fetchAPIQuest } from '../redux/actions';
import './game.css';

const magicNumber = 4;
const TEN = 10;
const obj = { easy: 1, medium: 2, hard: 3 };
class Game extends Component {
  state = {
    results: [],
    count: 0,
    arrayAnswer: [],
    correctAnswer: '',
    answerWrong: '',
    duration: 30,
    isButtonDisabled: false,
    totalAssertions: 0,
  };

  async componentDidMount() {
    const { history } = this.props;
    const responseApi = await fetchAPIQuest();
    if (responseApi.length === 0) {
      localStorage.clear();
      history.push('/');
    } else {
      this.setState({ results: responseApi }, this.handleQuestion);
    }
  }

  handleQuestion = () => {
    const { results, count } = this.state;
    const arrayQ = [results[count].correct_answer, ...results[count].incorrect_answers];
    const numberRamdom = 0.5;
    const answerState = arrayQ.sort(() => Math.random() - numberRamdom);
    this.setState({ arrayAnswer: answerState }, this.handleTime);
  };

  handleClick = (c) => {
    this.setState({ correctAnswer: 'correct', answerWrong: 'wrong' });
    const { score, dispatch } = this.props;
    const { results, count, duration } = this.state;
    let { totalAssertions } = this.state;
    clearInterval(this.id);
    if (c === 'correto') {
      const scoreTotal = score + (TEN + duration * obj[results[count].difficulty]);
      dispatch(addTotalScore(scoreTotal));
      this.setState({ totalAssertions: totalAssertions += 1 });
    } else {
      const zero = 0;
      const scoreTotal = score + zero;
      dispatch(addTotalScore(scoreTotal));
    }
    dispatch(addAssertions(totalAssertions));
  };

  handleNext = (event) => {
    event.preventDefault();
    let { count } = this.state;
    // const { history } = this.props;
    // const magicNumber = 4;
    if (count < magicNumber) {
      this.setState(({
        count: count += 1,
        correctAnswer: '',
        answerWrong: '',
        duration: 30 }), () => this.handleQuestion());
    } else {
      this.feedbackNext();
    }
  };

  feedbackNext = () => {
    const { count, correctAnswer } = this.state;
    const { history } = this.props;
    if (count === magicNumber && correctAnswer !== '') history.push('/Feedback');
  };

  handleTime = () => {
    const numberThousand = 1000;
    this.id = setInterval(() => {
      const { duration } = this.state;
      this.setState((prev) => ({ duration: prev.duration - 1 }));
      if (duration === 1) {
        clearInterval(this.id);
        this.setState({ isButtonDisabled: true });
      }
    }, numberThousand);
  };

  render() {
    const { results,
      count,
      arrayAnswer,
      correctAnswer,
      answerWrong,
      duration,
      isButtonDisabled } = this.state;
    return (
      <div>
        <Header />
        {
          results.length > 0 && (
            <div>
              <p>{ duration }</p>
              <p data-testid="question-category">{results[count].category}</p>
              <p data-testid="question-text">{results[count].question}</p>
            </div>
          )
        }
        <section data-testid="answer-options">
          {arrayAnswer.map((answer, index) => {
            const currentIndex = arrayAnswer.indexOf(results[count].correct_answer);
            return index === currentIndex ? (
              <button
                type="button"
                data-testid="correct-answer"
                key={ answer }
                onClick={ () => this.handleClick('correto') }
                className={ correctAnswer }
                disabled={ isButtonDisabled }
              >
                {answer}
              </button>
            ) : (
              <button
                type="button"
                key={ answer }
                data-testid={ `wrong-answer-${count}` }
                onClick={ () => this.handleClick('errado') }
                className={ answerWrong }
                disabled={ isButtonDisabled }
              >
                {answer}
              </button>
            );
          })}
          <div>
            { correctAnswer !== '' && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.handleNext }
              >
                Next
              </button>
            )}
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = (globalState) => ({
  score: globalState.player.score,
});
Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  score: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};
export default connect(mapStateToProps)(Game);
