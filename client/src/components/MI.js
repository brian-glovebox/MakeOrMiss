import React from "react"
import {Link} from "react-router-dom";
import { checkPropTypes } from "prop-types";

///////////////////
// MenuItem      //
///////////////////
function MenuItem(props) {
    return (
      <Link
        className='menu-item'
        id={ props.item.text }
        to={ props.item.add}
    
      >
        { props.item.text.toUpperCase() }
      </Link>
    )
  }

export default MenuItem; 


