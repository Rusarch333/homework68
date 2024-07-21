import React, { Component } from 'react';
import CounterControl from './CounterControl';
import Counter from './Counter';
import AutoClicker from './AutoClicker';
import styles from './CounterSection.module.sass';
import CONSTANTS from '../../constants';

const { MIN_COUNT_RANGE, INITIAL_STEP_VALUE, INITIAL_ISADD_FLAG_VALUE } =
  CONSTANTS;

class CounterSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: MIN_COUNT_RANGE,
      step: INITIAL_STEP_VALUE,
      isAdd: INITIAL_ISADD_FLAG_VALUE,
    };
  }

  setCount = (newCount) => {
    this.setState({ count: newCount });
  };

  setIsAdd = (newIsAdd) => {
    this.setState({ isAdd: newIsAdd });
  };

  setStep = (newStep) => {
    this.setState({ step: Number(newStep) });
  };

  render() {
    const { count, isAdd, step } = this.state;
    return (
      <section className={styles['counter-section']}>
        <CounterControl step={step} setStep={this.setStep} />
        <Counter
          count={count}
          setCount={this.setCount}
          isAdd={isAdd}
          setIsAdd={this.setIsAdd}
          step={step}
        />
        <AutoClicker
          count={count}
          setCount={this.setCount}
          isAdd={isAdd}
          step={step}
        />
      </section>
    );
  }
}

export default CounterSection;
