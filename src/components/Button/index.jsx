import React, { Component } from 'react';

export default class Button extends Component {
  render() {
    let classNames = 'btn btn-sm btn-outline-dark mx-1 ' + this.props.classes;

    return (
      <button
        type="button"
        className={classNames}
        onClick={this.props.onClick}
      >
        {this.props.text}
      </button>
    );
  }
}
