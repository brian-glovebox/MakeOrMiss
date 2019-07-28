import React, { Component } from "react";
import ad from '../assets/presented.png'


class About extends Component {
  // Initialize this.state.books as an empty array
  state = {

  };

  render() {
    return (
      <div className="windowBox" id="about">
      <h3>"It's a Make or Miss League"</h3>
      <br/>
      
      <br/>
        <h5>Make or Miss is data visualization project based on the 2018-2019 NBA Season. For this project we have chosen to take a look at games that were decided by three points our less and therefore could have changed the outcome based on the final shot. Explore how standings could have differed, potential wins for that season, the correlation between time left and distance of shot, team efficiency during these parameters, and all the what ifs that come with it.
<br/>
<br/>
<br/>
Web Application built in React
<br/>
<br/>
<br/>
Data was sourced from ESPN Advanced Stats and Basketball Reference.
<br/>
<br/>
<br/>
 Visuals were made with D3.js.
 <br/>
 <br/>
 <br/>
Dedicated to Rachel Nichols and ESPN’s The Jump
<br/>
<br/>
<br/>
Created by <a href="http://www.b-ford.dev">Brian Ford</a> and <a href="https://www.linkedin.com/in/leonardosilva88/">Leonardo Silva</a> - University of Denver Full Stack Web Development Graduates
</h5>

<img id="ad" src={ad} />

  </div>
      
    )
  }
}

export default About;
