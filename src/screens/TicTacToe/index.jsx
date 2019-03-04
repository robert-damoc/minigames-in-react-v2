import React, { Component } from 'react';
import Board from './Board';

export default class TicTacToe extends Component {
  render() {
    return (
      <div className="container game-canvas">
        <Board rowsCount={3} colsCount={3} />
      </div>
    );
  }
}
