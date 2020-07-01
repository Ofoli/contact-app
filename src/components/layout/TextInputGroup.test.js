import React from 'react';
import { shallow } from 'enzyme'
import TextInputGroup from './TextInputGroup';
import { findByTestAttr } from '../../../Utils/index';
import checkPropTypes from 'check-prop-types';

const setUp=(props={})=>{
    const component=shallow(<TextInputGroup {...props}/>);
    return component;
}


describe('TextInputGroup Component',()=>{
    it('should render without errors', ()=>{
        const props={
            label:'test label',
            name:'test name',
            value:'test value',
            placeholder:'test placeholder',
            type:'test type',
            onChange: ()=>'test onchange',
            error:'test error'
        }
        let component=setUp(props);
        const wrapper = findByTestAttr(component,'TextInputGroupComp');
        expect(wrapper.length).toBe(1)
    })
})
describe('checking propTypes', ()=>{
    it('should not throw a warning',()=>{
        
        const expectedProps={
            label:'test label',
            name:'test name',
            value:'test value',
            placeholder:'test placeholder',
            type:'test type',
            onChange: ()=>'test onchange',
            error:'test error'
        }
        const propErr=checkPropTypes(TextInputGroup.propTypes,expectedProps,'props',TextInputGroup.name)
        expect(propErr).toBeUndefined()
    })
})