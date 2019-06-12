import React, { Component } from "react";
import Carousel from '../components/Carousel'
import ReactLogo from '../assets/reactlogo.png'
import D3 from '../assets/d3.png'

class Main extends Component {
  // Initialize this.state.books as an empty array
  state = {

  };

  // Add code here to get all books from the database and save them to this.state.books

  render() {
    return (
      <div className="windowBox" id="main">
    <Carousel />
    <img id="react" src={ReactLogo} />
    <img id="d3" src={D3} />

  </div>
      
    )
  }
}

export default Main;
