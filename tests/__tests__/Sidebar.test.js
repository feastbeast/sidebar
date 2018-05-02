import React from 'react';
import Enzyme from 'enzyme';
import {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Sidebar from '../../client/src/components/Sidebar';

Enzyme.configure({ adapter: new Adapter() });

describe('Sidebar', () => {
  it('should be defined', () => {
    expect(Sidebar).toBeDefined();
  });
  it('should render correctly', () => {
    const tree = shallow(
      <Sidebar />
    );
    expect(tree).toMatchSnapshot();
  });

});
