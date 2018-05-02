import React from 'react';
import Enzyme from 'enzyme';
import {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import GMap from '../../client/src/components/GMap';

Enzyme.configure({ adapter: new Adapter() });

describe('GMap', () => {
  it('should be defined', () => {
    let location = 'SF';
    let id = '1234';

    let wrapper = shallow(<GMap
      location={location}
      id={id}
    />) 
    expect(wrapper).toBeDefined();
  });
  it('should render correctly', () => {
    let location = 'SF';
    let id = '1234';

    let tree = shallow(<GMap
      location={location}
      id={id}
    />) 
    expect(tree).toMatchSnapshot();
  });

});