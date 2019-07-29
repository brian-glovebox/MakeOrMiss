import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Team from "./pages/Team";
import DT from "./pages/DT";
import About from "./pages/About"
import Standings from "./pages/Standings";
import Wins from "./pages/Wins";
import momLogo from "./assets/momLogo.png"
import MenuContainer from "./components/MC"
import { Col, Row } from 'reactstrap';
import ReactLogo from '../src/assets/reactlogo.png'
import D3 from '../src/assets/d3.png'
import NBA from '../src/assets/NBAlogo.png'


function App() {
  return (
    <Router>

<Row>
          <Col md="2"><div className="appCol">

<a href="https://salty-coast-38970.herokuapp.com/"><img id="momLogo" src={momLogo} /></a>

<a target="_blank" href="https://reactjs.org/"><img id="react" src={ReactLogo} /></a>
<a target="_blank" href="https://d3js.org/"><img id="d3" src={D3} /></a>
<a target="_blank" href="https://www.nba.com"><img id="nba" src={NBA} /></a>

  </div></Col>
          <Col md="8"> <div className="appColMain">   <Switch>
        <Route exact path="/" render ={(props) => <Main {...props}/>}/>
        <Route exact path="/standings" render ={(props) => <Standings {...props}/>}/>
        <Route exact path="/wins" render ={(props) => <Wins {...props}/>}/>
        <Route exact path="/dt" render ={(props) => <DT {...props}/>}/>
        <Route exact path="/team" render ={(props) => <Team {...props}/>}/>
        <Route exact path="/about" render ={(props) => <About {...props}/>}/>
      </Switch></div></Col>
          <Col md="2">  <div className="appCol" id="appMenu">  <MenuContainer /></div></Col>
          
        </Row>
    </Router>

  );
}

export default App;
