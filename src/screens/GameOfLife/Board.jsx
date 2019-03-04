import Board from '../../components/Board';
import Utils from '../../components/Utils';

import './Board.scss';
import ExamplePlacement from './Example';

export default class GameOfLifeBoard extends Board {
  interval = null;

  componentDidMount = () => {
    this.resetSquares(false, ['dead'], this.updateStatus);
  }

  updateStatus = () => {
    let aliveCells = this.getAllSquares().reduce((acc, row) => acc + row.filter(cell => cell).length, 0);
    let newStatus = 'Cells Alive: ' + aliveCells;

    this.setStatusValue(newStatus);
  }

  handleSquareClick = (row, col) => {
    if (this.getSquareValue(row, col)) {
      this.setSquareClassNames(row, col, ['dead']);
    } else {
      this.setSquareClassNames(row, col, ['alive']);
    }

    this.setSquareValue(row, col, !this.getSquareValue(row, col), this.updateStatus);
  }

  controlButtons = () => {
    return ([
      {
        classes: 'play-pause-game',
        text: 'Play/Pause',
        onClick: this.swapGameState,
      }, {
        classes: 'reset',
        text: 'Reset',
        onClick: this.resetGame,
      }, {
        classes: 'set-random-cells',
        text: 'Random Cells',
        onClick: this.setRandomSquares,
      }, {
        classes: 'examples',
        text: 'Example',
        onClick: this.examplePlacement,
      },
    ]);
  }

  swapGameState = () => {
    if (this.interval) {
      this.pauseGame();
    } else {
      this.startGame();
    }
  }

  pauseGame = () => {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  startGame = () => {
    this.interval = setInterval(() => {
      const { rowsCount, colsCount } = this.props;

      let currentSquares = this.getAllSquares();

      for (let row = 0; row < rowsCount; row++) {
        for (let col = 0; col < colsCount; col++) {
          let nCount = this.neighboursCount(row, col, currentSquares);

          if (currentSquares[row][col]) {
            if (nCount < 2 || nCount > 3) {
              this.updateSquare(row, col, false, ['dead']);
            } else {
              this.updateSquare(row, col, true, ['alive']);
            }
          } else if (nCount === 3) {
            this.updateSquare(row, col, true, ['alive']);
          } else {
            this.updateSquare(row, col, false, ['dead']);
          }
        }
      }

      this.setSquareValue(0, 0, this.getSquareValue(0, 0), () => {
        this.updateStatus();
      });
    }, 50);
  }

  updateSquare(row, col, value, classes) {
    if (this.getSquareValue(row, col) === value) {
      return;
    }

    this.setSquareValue(row, col, value);
    this.setSquareClassNames(row, col, classes);
  }

  neighboursCount = (row, col, currentSquares) => {
    let nCount = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) { continue; }
        if (row + i < 0 || row + i >= this.props.rowsCount) { continue; }
        if (currentSquares[row + i][col + j]) { nCount++; }
      }
    }

    return nCount;
  }

  resetGame = () => {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }

    this.resetSquares(false, ['dead'], this.updateStatus);
  }

  examplePlacement = () => {
    let coords = ExamplePlacement.glidersSpawner(this.props);
    coords.forEach(pair => {
      this.updateSquare(pair[0], pair[1], true, ['alive']);
    });
  }

  setRandomSquares = () => {
    const { colsCount, rowsCount } = this.props;

    for (let i = 0; i < 10; i++) {
      let row = Utils.randomInt(0, rowsCount - 1);
      let col = Utils.randomInt(0, colsCount - 1);

      this.setSquareClassNames(row, col, ['alive']);
      if (i === 9) {
        this.setSquareValue(row, col, true, this.updateStatus);
      } else {
        this.setSquareValue(row, col, true);
      }
    }
  }
}
