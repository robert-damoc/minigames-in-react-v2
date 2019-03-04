import React, { Component } from 'react';

export default class Status extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  setValue = (value) => {
    this.setState({ value: value });
  }

  render() {
    return (
      <div className="container status text-center my-2">
        {this.state.value}
      </div>
    );
  }
}
