import React from 'react';
import Enzyme from 'enzyme';
import {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Menu from '../../client/src/components/Menu';

Enzyme.configure({ adapter: new Adapter() });

describe('Menu', () => {
  it('should be defined', () => {
    let menu_url = 'google.com';

    let wrapper = shallow(<Menu
      menu_url={menu_url} 
    />) 
    expect(wrapper).toBeDefined();
  });
  it('should render correctly', () => {
    let menu_url = 'google.com';

    let tree = shallow(<Menu
      menu_url={menu_url} 
    />) 
    expect(tree).toMatchSnapshot();
  });

});