import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NewProductForm from './Components/NewProductForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Agregar productos a la tienda</h1>
        </header>
        <div id="loader">
          <div className="sk-folding-cube">
            <div className="sk-cube1 sk-cube"></div>
            <div className="sk-cube2 sk-cube"></div>
            <div className="sk-cube4 sk-cube"></div>
            <div className="sk-cube3 sk-cube"></div>
          </div>
        </div>
        <div className="container">
          <NewProductForm />
        </div>
      </div>
    );
  }
}

export default App;
