import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Team from "./pages/Team";
import DT from "./pages/DT";
import Shots from "./pages/Shots";
import Standings from "./pages/Standings";
import Wins from "./pages/Wins";
import CustomNav from "./components/Nav"
import Navbar from "./components/Navbar";
// import { TopBar } from '../src/components/TopBar';
// import { Main } from '../src/components/Main';
// import nba from 'nba';

function App() {
  return (
    <Router>
    <div>
      <CustomNav />
      
      <Switch>
        <Route exact path="/" render ={(props) => <Main {...props}/>}/>
        <Route exact path="/standings" render ={(props) => <Standings {...props}/>}/>
        <Route exact path="/wins" render ={(props) => <Wins {...props}/>}/>
        <Route exact path="/dt" render ={(props) => <DT {...props}/>}/>
        <Route exact path="/team" render ={(props) => <Team {...props}/>}/>
      </Switch>
    </div>
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

