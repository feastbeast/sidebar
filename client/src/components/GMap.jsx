import React from 'react';

const GMap = (props) => {
  let mapLink= `https://www.google.com/maps/embed/v1/place?key=AIzaSyDfVc7Wl0xQOdHnSm30Yk2lZtcBTPEZtjM&q=${props.lat},${props.lng}`;
  //https://www.google.com/maps/embed/v1/place?key=AIzaSyBFIa4aaMYhCr78dTMyKkwxvA6ABpYZW9Y&center=-33.8569,151.2152
  //https://www.google.com/maps/embed/v1/search?key=AIzaSyBFIa4aaMYhCr78dTMyKkwxvA6ABpYZW9Y&q=record+stores+in+Seattle
  return (
    
    <div className="staticMap">
      <iframe
        frameBorder="0" 
        style={{border: 0}}
        src={mapLink}
        allowFullScreen
        
      >
      </iframe>
    </div>
  )
}

export default GMap;
window.GMap = GMap;