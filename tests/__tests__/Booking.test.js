import React from 'react';
import Enzyme from 'enzyme';
import {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Booking from '../../client/src/components/Booking';

Enzyme.configure({ adapter: new Adapter() });

describe('Booking', () => {
  it('should be defined', () => {
    expect(Booking).toBeDefined();
  });
  it('should render correctly', () => {
    const tree = shallow(
      <Booking />
    );
    expect(tree).toMatchSnapshot();
  });

});