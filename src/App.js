import React, { Component } from 'react';
import TodoWidget from './components/TodoWidget';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoWidget />
        <TodoWidget />
        <TodoWidget />
      </div>
    );
  }
}

export default App;
