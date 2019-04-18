import React, { Component } from 'react';
import Home from'./components/Home'
import Camera from './components/Camera'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/drive/:folder_id/:folder_name" component={Camera} />  
      </Router>
    );
  }
}

export default App;
