import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchAPIQuest } from '../redux/actions';
import './game.css';
import user from '../redux/reducers/user';

const EASY = 1;
const MEDIUM = 2;
const HARD = 3;
const TEN = 10;

class Game extends Component {
  state = {
    results: [],
    count: 0,
    arrayAnswer: [],
    correctAnswer: '',
    answerWrong: '',
    duration: 30,
    isButtonDisabled: false,
  };

  async componentDidMount() {
    const numberThirty = 30;
    const { history } = this.props;
    const responseApi = await fetchAPIQuest();
    if (responseApi.length === 0) {
      localStorage.clear();
      history.push('/');
    } else {
      this.setState({ results: responseApi }, this.handleQuestion);
    }
    this.handleTime(numberThirty);
  }

  handleQuestion = () => {
    const { results, count } = this.state;
    const arrayQ = [results[count].correct_answer, ...results[count].incorrect_answers];
    const numberRamdom = 0.5;
    const answerState = arrayQ.sort(() => Math.random() - numberRamdom);
    this.setState({ arrayAnswer: answerState });
  };

  handleClick = (c) => {
    this.setState({ correctAnswer: 'correct', answerWrong: 'wrong' });
    let { score, assertions, dispatch } = this.props;
    const { duration } = this.state;
    let diffcult;
    const { results, count } = this.state;
    if (c === 'correto') {
      if (results[count].difficulty === 'easy') {
        diffcult = EASY;
      } else if (results[count].difficulty === 'medium') {
        diffcult = MEDIUM;
      } else if (results[count].difficulty === 'hard') {
        diffcult = HARD;
      }
      score += (TEN + duration * diffcult);
      assertions += 1;
      dispatch(user({ score, assertions }));
    }
    console.log(score);
  };

  handleTime = (duration) => {
    const numberSixty = 60;
    const numberTen = 10;
    const numberThousand = 1000;
    const count = 1;
    // count -= 1;
    let timer = duration;
    let seconds;
    setInterval(() => {
      seconds = parseInt(timer % numberSixty, numberTen);
      seconds = seconds < numberTen ? `0${seconds}` : seconds;
      this.setState({ duration: timer });
      timer -= count;
      if (timer < 0) {
        timer = duration;
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
        </section>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  score: globalState.user.player.score,
  assertions: globalState.user.player.assertions,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Game);
