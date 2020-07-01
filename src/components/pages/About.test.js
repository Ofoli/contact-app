import React from 'react';
import { shallow } from 'enzyme'
import About from './About';
import { findByTestAttr } from '../../../Utils/index';

const setUp=(props={})=>{
    const component=shallow(<About/>);
    return component;
}

describe('About Component',()=>{

    let component;
    beforeEach( ()=>{
        component=setUp();
    })

    it('should render without errors', ()=>{
        const wrapper = findByTestAttr(component,'aboutComponent');
        expect(wrapper.length).toBe(1)
    })
    
    
    it('should render without errors', ()=>{
        const heading = findByTestAttr(component,'abouth1');
        expect(heading.length).toBe(1)
    })

    it('should render without errors', ()=>{
        const bodyText = findByTestAttr(component,'aboutp');
        expect(bodyText.length).toBe(2)
    })
})