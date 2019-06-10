import React, { Component } from "react";
import logo from "../assets/logo.svg";
import { Link, animateScroll as scroll } from "react-scroll";

export default class Navbar extends Component {
  scrollToTop = () => {
    scroll.scrollToTop();
  };

  render() {
    return (
      <nav className="nav" id="navbar">
        <div className="nav-content">
          <img
            src={logo}
            className="nav-logo"
            alt="Logo"
            onClick={this.scrollToTop}
          />
          <ul className="nav-items">
            <li className="nav-item">
              <Link
                activeClass="active"
                to="main"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Main
              </Link>
            </li>
            <li className="nav-item">
              <Link
                activeClass="active"
                to="standings"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Standings
              </Link>
            </li>
            <li className="nav-item">
              <Link
                activeClass="active"
                to="wins"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Wins
              </Link>
            </li>
            <li className="nav-item">
              <Link
                activeClass="active"
                to="BC"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Distance/Time
              </Link>
            </li>
            <li className="nav-item">
              <Link
                activeClass="active"
                to="team"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Team
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}