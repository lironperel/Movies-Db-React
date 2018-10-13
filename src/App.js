import React, { Component } from 'react';
import './App.css';
import logo from './img/logo.png';

import Movies from './components/Movies.js';

import { Navbar, Image } from 'react-bootstrap';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div className="main-app">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Image src= {logo} className="logo-img"/>
              <a href="#home">Herolo - Movies DB</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>

        <Movies />
        <div className="footer">
          <p><a href="mailto:lironp90@gmail.com">© 2018 Liron Perel</a></p>
        </div>
      </div>
    );
  }
}

export default App;
