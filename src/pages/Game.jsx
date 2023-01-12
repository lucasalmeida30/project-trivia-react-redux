import React, { Component } from 'react';
import Header from '../components/Header';
import { fetchAPIQuest } from '../redux/actions';

export default class Game extends Component {
  state = {
    results: [],
    index: 0,
    teste: [],
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
    const { results, index } = this.state;
    const randomize = 0.5;
    const array = [results[index].correct_answer, ...results[index].incorrect_answers];
    console.log(array, 'passou aqui');
    const random = array.sort(() => Math.random() - randomize);
    this.setState({ teste: random });
  };

  render() {
    const { results, index, teste } = this.state;
    return (
      <div>
        <Header />
        {
          results.length > 0 && (
            <div>
              <p data-testid="question-category">{results[index].category}</p>
              <p data-testid="question-text">{results[index].question}</p>
              <div data-testid="answer-options">
                {teste.map((item, indice) => (
                  <button
                    key={ indice }
                    type="button"
                    data-testid={ item === results[index].correct_answer
                      ? 'correct-answer'
                      : `wrong-answer-${index}` }
                  >
                    {item}
                  </button>
                ))}
              </div>

            </div>
          )
        }
      </div>
    );
  }
}
