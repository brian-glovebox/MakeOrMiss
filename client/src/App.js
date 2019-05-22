import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav.js";
import Main from "./pages/Main";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DV1 from "./pages/DV1";
import DV2 from "./pages/DV2";
import DV3 from "./pages/DV3";

function App() {
  return (
    <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" render ={(props) => <Main {...props}/>}/>
        <Route exact path="/about" render ={(props) => <About {...props}/>}/>
        <Route exact path="/contact" render ={(props) => <Contact {...props}/>}/>
        <Route exact path="/dv1" render ={(props) => <DV1 {...props}/>}/>
        <Route exact path="/dv2" render ={(props) => <DV2 {...props}/>}/>
        <Route exact path="/dv3" render ={(props) => <DV3 {...props}/>}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
