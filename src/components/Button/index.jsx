import React, { Component } from 'react';

export default class Button extends Component {
  render() {
    return (
      <button
        type="button"
        className="btn btn-sm btn-outline-dark"
        onClick={this.props.onClick}
      >
        {this.props.text}
      </button>
    );
  }
}
