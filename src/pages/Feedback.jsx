import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const numberThree = 3;
    return (
      <div data-testid="feedback-text">
        <Header />
        { assertions < numberThree ? <p>Could be better...</p> : <p>Well Done!</p> }
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};
const mapStateToProps = (globalState) => ({
  assertions: globalState.player.assertions,
});
export default connect(mapStateToProps)(Feedback);
