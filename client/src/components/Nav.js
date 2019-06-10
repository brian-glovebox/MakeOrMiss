import React from "react";
import { bubble as Menu } from 'react-burger-menu'
import {Link} from "react-router-dom";
import "../style.scss"

class Nav extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    return(
     <Menu>
        <Link id="about" className="menu-item" to={"/"} >Main</Link>
        <Link id="contact" className="menu-item" to={"/standings"} >Standings</Link>
        <Link id="dv1" className="menu-item" to={"/wins"}>Wins</Link>
        <Link id="standings" className="menu-item" to={"/dt"}>Distance/Time</Link>
        <Link id="dv3" className="menu-item" to={"/team"}>Teams</Link>
        <Link onClick={ this.showSettings } className="menu-item--small" to={""} >Settings</Link>
        </Menu>
    );
  }
}

export default Nav;
