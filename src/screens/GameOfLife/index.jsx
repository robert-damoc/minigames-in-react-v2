import React, { Component } from 'react';
import Board from './Board';

export default class GameOfLife extends Component {
  render() {
    return (
      <div className="container game-canvas">
        <Board rowsCount={50} colsCount={50} />
      </div>
    );
  }
}
