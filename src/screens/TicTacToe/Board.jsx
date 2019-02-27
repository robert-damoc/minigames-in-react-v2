import Board from '../../components/Board';
import Utils from '../../components/Utils';

import './Board.scss';

export default class TicTacToeBoard extends Board {
  players = ['X', 'O'];
  currentPlayerIndex = Utils.randomInt(0, 1);
  gameOver = false;

  componentDidMount = () => {
    this.updateStatus();
  }

  controlButtons = () => {
    return ([{
      classes: 'play-again',
      text: 'Play Again!',
      onClick: this.playAgain,
    }]);
  }

  handleSquareClick = (row, col) => {
    if (this.gameOver || this.getSquareValue(row, col)) { return; }

    this.setSquareValue(row, col, this.players[this.currentPlayerIndex]);

    if (this.gameIsOver(row, col)) {
      this.gameOver = true;
    } else {
      this.setSquareClassNames(row, col, ['used']);
      this.currentPlayerIndex = 1 - this.currentPlayerIndex;
    }

    this.updateStatus();
  }

  playAgain = () => {
    this.currentPlayerIndex = Utils.randomInt(0, 1);
    this.gameOver = false;
    this.updateStatus();
    this.resetSquares(null);
  }

  updateStatus = () => {
    let newStatus = '';

    if (this.gameOver) {
      if (typeof this.currentPlayerIndex === 'number') {
        newStatus = 'Winner: ' + this.players[this.currentPlayerIndex];
      } else {
        newStatus = 'Tie!';
      }
    } else {
      newStatus = 'Next Player: ' + this.players[this.currentPlayerIndex];
    }

    this.setStatusValue(newStatus);
  }

  markWinningSquares = (winningSquaresIndices) => {
    winningSquaresIndices.forEach(pair => {
      this.setSquareClassNames(pair[0], pair[1], ['marked']);
    })
  }

  gameIsOver = (row, col) => {
    let squares = this.getLocalSquares();
    squares[row][col] = this.players[this.currentPlayerIndex];

    if (squares.every(row => row.every(square => !!square))) {
      this.currentPlayerIndex = null;
      return true;
    }

    for (let i = 0; i < this.props.rowsCount; i++) {
      if (squares[i][0] && squares[i][0] === squares[i][1] && squares[i][0] === squares[i][2]) {
        this.markWinningSquares([[i, 0], [i, 1], [i, 2]]);
        return true;
      }
    }

    for (let j = 0; j < this.props.colsCount; j++) {
      if (squares[0][j] && squares[0][j] === squares[1][j] && squares[0][j] === squares[2][j]) {
        this.markWinningSquares([[0, j], [1, j], [2, j]]);
        return true;
      }
    }

    if (squares[0][0] && squares[0][0] === squares[1][1] && squares[0][0] === squares[2][2]) {
      this.markWinningSquares([[0, 0], [1, 1], [2, 2]]);
      return true;
    }

    if (squares[0][2] && squares[0][2] === squares[1][1] && squares[0][2] === squares[2][0]) {
      this.markWinningSquares([[0, 2], [1, 1], [2, 0]]);
      return true;
    }

    return false;
  }

  render() {
    return this.renderBoard();
  }
}
