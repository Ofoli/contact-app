import React from 'react';
import { shallow } from 'enzyme'
import Contact from './Contact';
import { findByTestAttr } from '../../../Utils/index';
import checkPropTypes from 'check-prop-types';

const setUp=(props={})=>{
    const component=shallow(<Contact {...props}/>);
    return component;
}
describe(' Contact Component',()=>{
    it('should render without errors', =>{
        const props={
            branding:'test branding',
        }
        let component=setUp(props);
        const wrapper = findByTestAttr(component,'ContactComponent');
        expect(wrapper.length).toBe(1)
    })
})

describe('checking propTypes', ()=>{
    it('should not throw a warning',()=>{
        
        const expectedProps={
            contact:{value: 'test contact'}
        }
        const propErr=checkPropTypes(Contact.propTypes,expectedProps,'props',Contact.name)
        expect(propErr).toBeUndefined()
    })
})