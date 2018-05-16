import React from 'react';
import ReactDOM from 'react-dom'
import Menu from './Menu.jsx';
import Booking from './Booking.jsx';
import Hours from './Hours.jsx';
import Contact from './Contact.jsx';
import GMap from './GMap.jsx';
const axios = require('axios');
import {Icon, Modal} from 'react-materialize';
//import '../../dist/sidebar.css';


export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      place: {hours: [ "Monday: 11:30 AM – 2:30 PM 5:30 – 9:30 PM", "Tuesday: 11:30 AM – 2:30 PM 5:30 – 9:30 PM", "Wednesday: 11:30 AM – 2:30 PM 5:30 – 9:30 PM", "Thursday: 11:30 AM – 2:30 PM 5:30 – 9:30 PM", "Friday: 11:30 AM – 9:30 PM", "Saturday: 11:30 AM – 9:30 PM", "Sunday: 11:30 AM – 9:30 PM" ], address: "", phone: "", website: "", location: "", id: 1, name: "", url: "", menu_url: "", coordslat: "", coordslng: ""},
      isLoaded: true,
      isModal:false

    };

    this.getPlace = this.getPlace.bind(this);
  };

  componentDidMount() {
    if (typeof(window) !== 'undefined') {
      this.setState({isModal: true})
      this.getPlace();
    }
  };
  

  getPlace() {
    let context = this;
    const id = this.props.restaurantId;
    //let id = window.location.href.split('/')[4];
    axios.get(`${BASE_URL}/api/restaurants/${id}`)
    .then((res) => {
      this.setState({
        place: res.data,
        isLoaded: true
      })
    })
    .catch((err) => console.log(err));
  };

  render() {
    const { hours, address, phone, website, location, id, name, url, menu_url, coordslat, coordslng } = this.state.place;
    if (!this.state.isLoaded) {
      return <div>Loading...</div>
    }
    if (this.state.isLoaded) {
      return (
        
          <div className="sidebar">
            <Menu  menuUrl={menu_url}/>
            <div className="greyBar"></div>
            <Booking />
            <div className="greyBar"></div>
            <div className="inSidebar">
              <Hours hours={hours}/>
              {this.state.isModal && 
                <Contact
                address={address} 
                phone={phone}
                website={url}
                lat={coordslat}
                lng={coordslng}
                id={id}
                name={name}
                />
              }
              
              <GMap 
                location={location}
                id={id}
                lat={coordslat}
                lng={coordslng}
              />
            </div>
          </div>
   
      );
    }
  }
}


