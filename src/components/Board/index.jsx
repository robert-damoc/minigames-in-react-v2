import React, { Component } from 'react';
import Square from '../Square';
import Status from '../Status';
import Button from '../Button';

import './Board.scss'

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.statusElement = React.createRef();
    this.initSquares();
  }

  initSquares = () => {
    this.squares = [];
    for (let row = 0; row < this.props.rowsCount; row++) {
      let line = [];
      for (let col = 0; col < this.props.colsCount; col++) {
        line.push(React.createRef());
      }
      this.squares.push(line);
    }
  }

  getAllSquares = () => {
    return this.squares.map((row) => {
      return row.map(square => square.current.getValue());
    });
  }

  resetSquares = (value, classNames = [], callBack) => {
    this.squares.forEach((row) => {
      row.forEach(square => {
        square.current.setClassNames(classNames);
        square.current.setValue(value);
      });
    });
    this.squares[0][0].current.setValue(value, callBack);
  }

  setStatusValue = (status) => {
    this.statusElement.current.setValue(status);
  }

  getSquareValue = (row, col) => {
    return this.squares[row][col].current.getValue();
  }

  setSquareValue = (row, col, value, callBack) => {
    this.squares[row][col].current.setValue(value, callBack);
  }

  setSquareClassNames = (row, col, classNames) => {
    this.squares[row][col].current.setClassNames(classNames);
  }

  renderSquare = (row, col) => {
    return (
      <Square
        key={'el-' + row + '-' + col}
        ref={this.squares[row][col]}
        onClick={() => this.handleSquareClick(row, col)}
      />
    );
  }

  renderSquares = () => {
    let squares = []

    for (let row = 0; row < this.props.rowsCount; row++) {
      let cells = [];
      for (let col = 0; col < this.props.colsCount; col++) {
        cells.push(this.renderSquare(row, col));
      }

      squares.push(
        <div key={'row-' + row} className="row">
          <div className="col d-flex justify-content-center">
            {cells}
          </div>
        </div>
      );
    }

    return squares;
  }

  controlButtons = () =>  [];

  renderButtons = () => {
    return this.controlButtons().map((button, i) => (
      <Button
        text={button.text}
        onClick={button.onClick}
        classes={button.classes}
        key={'controlButton-' + i}
      />
    ));
  }

  renderBoard = () => {
    return (
      <div className="container game-board">
        <Status ref={this.statusElement} />

        <div className="container board">
          {this.renderSquares()}
        </div>

        <div className="container controlButtons d-flex justify-content-center mt-2">
          {this.renderButtons()}
        </div>
      </div>
    );
  }

  render() {
    return this.renderBoard();
  }
}
