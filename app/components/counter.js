import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { decrement, increment } from '../actions';


const Counter = props =>
  <div className="counter">
    <div className="count">
      <h1>{props.count}</h1>
    </div>
    <div className="actions">
      <div className="row">
        <div className="col-md-6 text-right">
          <button className="btn btn-primary" onClick={props.decrement}>
            decrement
          </button>
        </div>
        <div className="col-md-6 text-left">
          <button className="btn btn-primary" onClick={props.increment}>
            increment
          </button>
        </div>
      </div>
    </div>
  </div>;

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  decrement: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired
};

export default connect(
  ({ count }) => ({ count }),
  { decrement, increment },
)(Counter);
