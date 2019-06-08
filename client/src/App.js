import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav.js";
import Main from "./pages/Main";
import Team from "./pages/Team";
import DT from "./pages/DT";
import DV1 from "./pages/DV1";
import Standings from "./pages/Standings";
import DV3 from "./pages/DV3";
// import { TopBar } from '../src/components/TopBar';
// import { Main } from '../src/components/Main';
// import nba from 'nba';

function App() {
  return (
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

