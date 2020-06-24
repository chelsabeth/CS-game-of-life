import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Grid extends React.Component {
  render() {
    const width = this.props.cols * 14;
    var rowsArr = []

    var boxClass = "";
    for (var i = 0; i < this.props.rows; i++) {
      
    }
    return (
      <div className="grid" style={{width: width}}>
        {{rowsArr}}
      </div>
    )
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
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
  }

  render() {
    return (
      <div>
        <h1>The Game of Life</h1>
        <Grid
          gridFull={this.state.gridFull} // from our state
          rows={this.rows} // props from Grid
          cols={this.cols}/>  
        <h2>Generation: {this.state.generation}</h2>
        <p>Created By Chelsea Wetzel</p>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
