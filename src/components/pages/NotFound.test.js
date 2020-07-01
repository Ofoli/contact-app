import React from 'react';
import { shallow } from 'enzyme'
import NotFound from './NotFound';
import { findByTestAttr } from '../../../Utils/index';



const setUp=(props={})=>{
    const component=shallow(<NotFound/>);
    return component;
}

describe('Page-Not-found component',()=>{

    let component;
    beforeEach( ()=>{
        component=setUp();
    })

    it('should render without errors', ()=>{
        const wrapper = findByTestAttr(component,'nF-main-div');
        expect(wrapper.length).toBe(1)
    })
    it('should render without errors', ()=>{
        const h1 = findByTestAttr(component,'nF-h1');
        expect(h1.length).toBe(1)
    })
    it('should render without errors', ()=>{
        const pTag = findByTestAttr(component,'nF-p');
        expect(pTag.length).toBe(1)
    })
    it('should render without errors', ()=>{
        const spanTag = findByTestAttr(component,'nF-span');
        expect(spanTag.length).toBe(1)
    })
})