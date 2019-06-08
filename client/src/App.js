import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav.js";
import Main from "./pages/Main";
import Team from "./pages/Team";
import DT from "./pages/DT";
<<<<<<< HEAD
import Shots from "./pages/Shots";
=======
import DV1 from "./pages/DV1";
>>>>>>> 449b2242b5502bc876e938717345710d76aa54b5
import Standings from "./pages/Standings";
import Wins from "./pages/Wins";
import Navbar from "./components/Navbar";
// import { TopBar } from '../src/components/TopBar';
// import { Main } from '../src/components/Main';
// import nba from 'nba';

function App() {
  return (
<<<<<<< HEAD
    // <Router>
    // <div>
    //   <Nav />
    //   {/* <TopBar />
    //   <Main /> */}
    //   <Switch>
    //     <Route exact path="/" render ={(props) => <Main {...props}/>}/>
    //     <Route exact path="/about" render ={(props) => <About {...props}/>}/>
    //     <Route exact path="/contact" render ={(props) => <Contact {...props}/>}/>
    //     <Route exact path="/dv1" render ={(props) => <DV1 {...props}/>}/>
    //     <Route exact path="/standings" render ={(props) => <Standings {...props}/>}/>
    //     <Route exact path="/dv3" render ={(props) => <DV3 {...props}/>}/>
    //   </Switch>
    // </div>
    // </Router>

    <div className="App">
        <Navbar />
        <Main
          id="main"
        />
        <Standings
          id="standings"
        />
        <Wins
          id="wins"
        />
        <DT
          id="dt"
        />
        <Team
          id="team"
        />
      </div>

=======
    <Router>
    <div>
      <Nav />
      {/* <TopBar />
      <Main /> */}
      <Switch>
        <Route exact path="/" render ={(props) => <Main {...props}/>}/>
        <Route exact path="/team" render ={(props) => <Team {...props}/>}/>
        <Route exact path="/dt" render ={(props) => <DT {...props}/>}/>
        <Route exact path="/dv1" render ={(props) => <DV1 {...props}/>}/>
        <Route exact path="/standings" render ={(props) => <Standings {...props}/>}/>
        <Route exact path="/dv3" render ={(props) => <DV3 {...props}/>}/>
      </Switch>
    </div>
    </Router>
>>>>>>> 449b2242b5502bc876e938717345710d76aa54b5
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

