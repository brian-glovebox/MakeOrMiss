import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Team from "./pages/Team";
import DT from "./pages/DT";
import Shots from "./pages/Shots";
import Standings from "./pages/Standings";
import Wins from "./pages/Wins";
import CustomNav from "./components/Nav"
import { UncontrolledCarousel } from 'reactstrap';

import Navbar from "./components/Navbar";
import momLogo from "./assets/momLogo.png"
import MenuContainer from "./components/MC"
import { Col, Row } from 'reactstrap';
import ReactLogo from '../src/assets/reactlogo.png'
import D3 from '../src/assets/d3.png'
import NBA from '../src/assets/NBAlogo.png'
// import { TopBar } from '../src/components/TopBar';
// import { Main } from '../src/components/Main';
// import nba from 'nba';

function App() {
  return (
    <Router>

<Row>
          <Col md="2"><div className="appCol">

<img id="momLogo" src={momLogo} />

<img id="react" src={ReactLogo} />
    <img id="d3" src={D3} />
    <img id="nba" src={NBA} />

  </div></Col>
          <Col md="8"> <div className="appColMain">   <Switch>
        <Route exact path="/" render ={(props) => <Main {...props}/>}/>
        <Route exact path="/standings" render ={(props) => <Standings {...props}/>}/>
        <Route exact path="/wins" render ={(props) => <Wins {...props}/>}/>
        <Route exact path="/dt" render ={(props) => <DT {...props}/>}/>
        <Route exact path="/team" render ={(props) => <Team {...props}/>}/>
      </Switch></div></Col>
          <Col md="2">  <div className="appCol" id="appMenu">  <MenuContainer /></div></Col>
          
        </Row>
    </Router>

  );
}

export default App;

// import React, { Component } from 'react';
// import { TopBar } from '../src/components/TopBar';
// import { Main } from '../src/components/Main';
// import nba from 'nba';

// window.nba = nba;

// class App extends Component {


//   render() {
//     console.log('render', this.state);
//     return (
//         <div className="App">
//           <TopBar />
//           <Main />
//         </div>
//     );
//   }
// }

// export default App;

