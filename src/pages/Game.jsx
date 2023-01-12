import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchAPIQuest } from '../redux/actions';

export default class Game extends Component {
  state = {
    results: [],
    count: 0,
    arrayAnswer: [],
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
    this.setState({ arrayAnswer: answerState });
  };

  render() {
    const { results, count, arrayAnswer } = this.state;
    return (
      <div>
        <Header />
        {
          results.length > 0 && (
            <div>
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
              >
                {answer}
              </button>
            ) : (
              <button
                type="button"
                key={ answer }
                data-testid={ `wrong-answer-${count}` }
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
