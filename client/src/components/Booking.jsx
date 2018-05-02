import React from 'react';
import {Icon} from 'react-materialize';

const Booking = (props) => {

  return (
    <a href="http://www.google.com" target="_blank">
      <div className="btns"><span className="buttonText">  BOOK WITH OPENTABLE  </span><Icon className="icons bookingIcon" right>event_available</Icon></div>
    </a>
  )
}

export default Booking;
window.Booking = Booking;
