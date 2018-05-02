import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'react-materialize';
import moment from 'moment';
import Collapsible from 'react-collapsible';



export default class Hours extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newHours: [],
      isLoaded: false
    };
    this.sortHours = this.sortHours.bind(this)
 
  };

  componentDidMount() {
    this.sortHours();
  };

  sortHours() {
    let currDay = moment().weekday(); // Mon = 1, Tues = 2, etc.
    let currHours = this.props.hours.slice(currDay-1).concat(this.props.hours.slice(0, currDay-1));
    this.setState({
      newHours: currHours,
      isLoaded: true
    })
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>Loading...</div>
    }

    {this.state.newHours.slice(1).map((day) => {
      <p className="day">day</p>
    })}

    if (this.state.isLoaded) {
      return ( 
        <div className="wrap-collabsible">
          <Icon className="contactIcon schedule icons">schedule</Icon>
          <input id="collapsible" className="toggle" type="checkbox" />
          <label forhtml="collapsible" className="lbl-toggle">{this.state.newHours[0]}</label>
            <div className="collapsible-content">
              <div className="content-inner">
                {this.state.newHours.slice(1).map((day) => {
                  return <p className="day">
                            {day.split('y:').join('y  .......  ')}
                        </p>
                })}
              </div>
            </div>
        </div>
      )
    }
  }
}
window.Hours = Hours;

