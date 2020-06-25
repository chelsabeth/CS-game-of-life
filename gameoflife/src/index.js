import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// BOOTSTRAP
import { ButtonToolbar, DropdownItem, DropdownButton } from "react-bootstrap";

class Box extends React.Component {
  selectBox = () => {
    this.props.selectBox(this.props.row, this.props.col);
  };
  render() {
    return (
      <div
        className={this.props.boxClass}
        id={this.props.id}
        onClick={this.selectBox}
      />
    );
  }
}

class Grid extends React.Component {
  render() {
    const width = this.props.cols * 14;
    var rowsArr = [];

    var boxClass = "";
    for (var i = 0; i < this.props.rows; i++) {
      for (var j = 0; j < this.props.cols; j++) {
        // you can do this with map as well
        let boxId = i + "_" + j;

        boxClass = this.props.gridFull[i][j] ? "box on" : "box off"; // classes from CSS to see if boxes are on or off
        rowsArr.push(
          <Box
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            row={i}
            col={j}
            selectBox={this.props.selectBox} // this method is being passed through two components
          />
        );
      }
    }
    return (
      <div className="grid" style={{ width: width }}>
        {rowsArr}
      </div>
    );
  }
}

class Buttons extends React.Component {
  handleSelect = (e) => {
    this.props.gridSize(e) // this event is going to be coming from the eventKey in the DropdownItem section
  }
  render() {
    return (
      <div className="center">
        <ButtonToolbar>
          <button className="btn" onClick={this.props.playButton}>
            Play
          </button>
          <button className="btn" onClick={this.props.pauseButton}>
            Pause
          </button>
          <button className="btn" onClick={this.props.clear}>
            Clear
          </button>
          <button className="btn" onClick={this.props.slow}>
            Slow
          </button>
          <button className="btn" onClick={this.props.fast}>
            Fast
          </button>
          <button className="btn" onClick={this.props.seed}>
            Seed
          </button>
          <DropdownButton
            title="Grid Size"
            id="size-menu"
            onSelect={this.handleSelect}
          >
            <DropdownItem eventKey="1">25x25</DropdownItem>
            <DropdownItem eventKey="2">50x30</DropdownItem>
            <DropdownItem eventKey="3">70x50</DropdownItem>
          </DropdownButton>
        </ButtonToolbar>
      </div>
    );
  }
}

class Main extends React.Component {
  constructor() {
    super();
    this.speed = 100;
    this.rows = 30;
    this.cols = 50;

    this.state = {
      generation: 0,
      gridFull: Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill(false)),
    };
  }
  // when a box is selected we want it to change from false to true from the gridFull Array,
  // but since we do not want to change state directly, we are going to make a copy of the array
  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col]; // will turn box green when clicked, not green when clicked again
    this.setState({
      gridFull: gridCopy,
    });
  };

  seed = () => {
    // create random generated squares when game starts
    let gridCopy = arrayClone(this.state.gridFull);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    this.setState({
      gridFull: gridCopy,
    });
  };

  playButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed); // will create each generation on play button
  };

  pauseButton = () => {
    clearInterval(this.intervalId);
  };

  slow = () => {
    this.speed = 1000;
    this.playButton();
  }

  fast = () => {
    this.speed = 100;
    this.playButton();
  }

  clear = () => {
    var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false)); // sets back to org array
    this.setState({
      gridFull: grid,
      generation: 0
    })
  }

  gridSize = (size) => {
    switch (size) {
      case "1":
        this.cols = 25;
        this.rows = 25;
      break;
      case "2":
        this.cols = 50;
        this.rows = 30;
      break;
      default:
        this.cols = 70;
        this.rows = 50;
    }
    this.clear();
  }

  play = () => {
    // main function for making game work
    let g = this.state.gridFull;
    let g2 = arrayClone(this.state.gridFull); // going to start changing the squares, check what grid is currently like

    // rules for Conway's Game of Life 👇
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // go through every elem in the grid
        let count = 0; // count is how many neighbors it has
        // if there is a neighbor, we increase by one.
        // Since each cell has 8 potential neighbors, you can see, there are 8 lines increasing the count
        if (i > 0) if (g[i - 1][j]) count++;
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
        if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
        if (j < this.cols - 1) if (g[i][j + 1]) count++;
        if (j > 0) if (g[i][j - 1]) count++;
        if (i < this.rows - 1) if (g[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && this.cols - 1) if (g[i + 1][j + 1]) count++;
        // then we need to decide whether it will live or die
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false; // if it's dead and it has three neighbors, it becomes a live cell
        if (!g[i][j] && count === 3) g2[i][j] = true; // if there is less than two or more than three, it dies
      }
    }
    this.setState({
      gridFull: g2,
      generation: this.state.generation + 1, // we increment the generation
    });
  };

  componentDidMount() {
    this.seed();
    // this.playButton() // seed & start the game
  }

  render() {
    return (
      <div>
        <h1>The Game of Life</h1>
        <Buttons
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          seed={this.seed}
          gridSize={this.gridSize}
        />
        <h2>Generation: {this.state.generation}</h2>
        <Grid
          gridFull={this.state.gridFull} // from our state
          rows={this.rows} // props from Grid
          cols={this.cols}
          selectBox={this.selectBox}
        />
        <h5>Rules:</h5>
        <p>1. Any live cell with fewer than two live neighbours dies, as if by underpopulation</p>
        <p>2. Any live cell with two or three live neighbours lives on to the next generation</p>
        <p>3. Any live cell with more than three live neighbours dies, as if by overpopulation</p>
        <p>4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction</p>
      </div>
    );
  }
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr)); // helper function to clone arrays to avoid changing state
}

ReactDOM.render(<Main />, document.getElementById("root"));
