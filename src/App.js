import React, { Component } from 'react';
import Board from './Components/Board/board.js'
import './App.css';
import './menu.png'
class App extends Component {
  state={
    image:require('./menu.png')
  }
  render() {
    return (
      <div>
        <header>
          <div className="menu-bar">
            <img src={this.state.image} alt="car" className="menu-img" align="middle"/>
          </div>
        </header>
        <Board/>
      </div>
    );
  }
}

export default App;
