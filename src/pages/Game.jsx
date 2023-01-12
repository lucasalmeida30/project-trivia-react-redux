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
    const array = [results[index].correct_answer, ...results[index].incorrect_answers] 
    const teste = results.sort(() => Math.random() - 0.5);
    this.setState({ teste });
  };

  render() {
    const { results, index } = this.state;
    return (
      <div>
        <Header />
        {
          results.length > 0 && (
            <div>
              <p>{results[index].category}</p>
              <p>{results[index].question}</p>
            </div>
          )
        }
      </div>
    );
  }
}
