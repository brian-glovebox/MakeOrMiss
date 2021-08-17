import React, { Component } from "react";
import Carousel from '../components/Carousel'


class Main extends Component {
  render() {
    return (<>
      <div className="windowBox" id="main">
    <Carousel />
  </div>

    <p id="ptag">"It's a Make or Miss League"</p>
    <p id="ptag1">A Data Visualization Project</p>
  
      </>
    )
  }
}

export default Main;
