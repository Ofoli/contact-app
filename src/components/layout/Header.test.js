import React from 'react';
import { shallow } from 'enzyme'
import Header from './Header';
import { findByTestAttr } from '../../../Utils/index';
import checkPropTypes from 'check-prop-types';

const setUp=(props={})=>{
    const component=shallow(<Header {...props}/>);
    return component;
}
describe(' Header Component',()=>{
    it('should render without errors', ()=>{
        const props={
            branding:'test branding',
        }
        let component=setUp(props);
        const wrapper = findByTestAttr(component,'HeaderComponent');
        expect(wrapper.length).toBe(1)
    })
})

describe('checking propTypes', ()=>{
    it('should not throw a warning',()=>{
        
        const expectedProps={
            branding:'test branding'
        }
        const propErr=checkPropTypes(Header.propTypes,expectedProps,'props',Header.name)
        expect(propErr).toBeUndefined()
    })
})