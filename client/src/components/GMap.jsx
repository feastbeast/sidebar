import React from 'react';

const GMap = (props) => {
  let mapLink= `https://www.google.com/maps/embed/v1/place?key=AIzaSyDfVc7Wl0xQOdHnSm30Yk2lZtcBTPEZtjM&q=${props.lat},${props.lng}`;
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
