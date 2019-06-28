import React, { Component } from "react";
import Carousel from '../components/Carousel'


class Main extends Component {
  // Initialize this.state.books as an empty array
  state = {

  };

  // Add code here to get all books from the database and save them to this.state.books

  render() {
    return (
      <div className="windowBox" id="main">
    <Carousel />

    <p id="ptag">"It's a Make or Miss League"</p>
    <p id="ptag1">A Data Visualization Project</p>
    

  </div>
      
    )
  }
}

export default Main;
