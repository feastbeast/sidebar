import React from 'react';
import {Icon, Modal} from 'react-materialize';

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
  };


  render() {
    
    let tel = `tel:${this.props.phone}`;
    
    let store = this.props.name.split(' ').join('+');
    let navLink =`https://www.google.com/maps/embed/v1/place?key=AIzaSyDfVc7Wl0xQOdHnSm30Yk2lZtcBTPEZtjM&q=${this.props.lat},${this.props.lng}`;
    let modalLink= `https://www.google.com/maps/embed/v1/place?key=AIzaSyDfVc7Wl0xQOdHnSm30Yk2lZtcBTPEZtjM&q=${this.props.lat},${this.props.lng}`;
    
    return (
      <div className="contact" style={{content: {left: "0px", "margin-left": "0px"}}}>
        <Modal
          className="mapModal"
          trigger={<div className="address row">
                    <Icon className="contactIcon icons">location_on</Icon>
                    <span className="contactText">{this.props.address}</span>
                  </div>}
        >
          <iframe
            width="1000px"
            height="500px"
            frameBorder="0" 
            style={{border: 0}}
            src={modalLink}
            allowFullScreen
          >
          </iframe>
        </Modal>
        <div className="phone row">
          <a href={tel} target="blank">
          <Icon className="contactIcon icons">phone</Icon>
          <span className="contactText">{this.props.phone}</span>
          </a>
        </div>
        <div className="website row">
          <a href={this.props.website} target="blank">
          <Icon className="contactIcon icons">web</Icon>
          <span className="contactText">{this.props.website}</span>
          </a>
        </div>
        <div className="directions row">
          <a href={navLink} target="blank">
          <Icon className="contactIcon icons">directions</Icon>
          <span className="contactText">Get Directions</span>
          </a>
        </div>
    </div>
    )
  }
}

//window.Contact = Contact;