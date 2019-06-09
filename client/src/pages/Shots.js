import React, { Component } from 'react';
import { Main } from '../components/Main';
import nba from 'nba';

window.nba = nba;

class Shots extends Component {


  render() {
    console.log('render', this.state);
    return ( <div className="windowBox" id="shots">
        {/* <div className="App">

        <Main />
        </div> */}
        </div>
    );
  }
}

export default Shots;
