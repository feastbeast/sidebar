import React from 'react';
import ReactDOM from 'react-dom'
import Menu from './Menu.jsx';
import Booking from './Booking.jsx';
import Hours from './Hours.jsx';
import Contact from './Contact.jsx';
import GMap from './GMap.jsx';
const axios = require('axios');
import '../../dist/style.css';


export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      place: {},
      isLoaded: false
    };

    this.getPlace = this.getPlace.bind(this);
  };
  componentDidMount() {
    this.getPlace();
  };

  getPlace() {
    let context = this;
    let id = window.location.href.split('/')[4];
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
    const { hours, address, phone, website, location, id, name, url, menu_url, coords } = this.state.place;
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
              <Contact
                address={address} 
                phone={phone}
                website={url}
                lat={coords.lat}
                lng={coords.lng}
                id={id}
                name={name}
              />
              <GMap 
                location={location}
                id={id}
                lat={coords.lat}
                lng={coords.lng}
              />
            </div>
          </div>
   
      );
    }
  }
}



window.Sidebar = Sidebar;

