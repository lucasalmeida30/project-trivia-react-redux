import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchAPIQuest } from '../redux/actions';
import './game.css';

export default class Game extends Component {
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

  handleClick = () => {
    this.setState({ correctAnswer: 'correct', answerWrong: 'wrong' });
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
                onClick={ this.handleClick }
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
                onClick={ this.handleClick }
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

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
