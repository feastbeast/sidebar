import React from 'react';
import {Icon} from 'react-materialize';

const Menu = ({menuUrl}) => {

  return (
    <a href={menuUrl} target="_blank">
      <div className="btns"><span className="buttonText">  VIEW MENU  </span><Icon className="icons menuIcon" right>restaurant</Icon></div>
    </a>
  )
}

export default Menu;
window.Menu = Menu;