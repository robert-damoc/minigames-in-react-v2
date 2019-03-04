import React, { Component } from 'react';

import './Square.scss';

export default class Square extends Component {
  constructor(props) {
    super(props);
    this.state = { value: null, classNames: [] };
  }

  setValue = (value, callBack = () => {}) => {
    this.setState({ value: value }, callBack);
  }

  getValue = () => {
    return this.state.value;
  }

  setClassNames = (classNames) => {
    this.setState({ classNames: classNames });
  }

  classNames = () => {
    const { classNames } = this.state;
    return 'square ' + classNames.join(' ');
  }

  render() {
    return (
      <div className={this.classNames()} onClick={this.props.onClick}>
        {this.state.value}
      </div>
    );
  }
}
