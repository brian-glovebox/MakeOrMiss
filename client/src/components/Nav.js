import React from "react";
import { stack as Menu } from 'react-burger-menu'
import {Link} from "react-router-dom";
import "../style.scss"

class Nav extends React.Component {
  showSettings (event) {
    event.preventDefault();
    
    
    
  }

  render () {
    return (
      <Menu>
        <Link id="about" className="menu-item" to={"/about"} >About</Link>
        <Link id="contact" className="menu-item" to={"/contact"} >Contact</Link>
        <Link id="dv1" className="menu-item" to={"/dv1"}>DV Test 1</Link>
        <Link id="dv1" className="menu-item" to={"/dv2"}>DV Test 2</Link>
        <Link id="dv1" className="menu-item" to={"/dv3"}>DV Test 3</Link>
        <Link onClick={ this.showSettings } className="menu-item--small" to={""} >Settings</Link>
      </Menu>
    );
  }
}

export default Nav;

