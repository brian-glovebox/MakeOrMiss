import React, { Component } from 'react';
import { Main } from '../components/Main';
import nba from 'nba';

window.nba = nba;

class DV1 extends Component {


  render() {
    console.log('render', this.state);
    return (
        <div className="App">

          <Main />
        </div>
    );
  }
}

export default DV1;
