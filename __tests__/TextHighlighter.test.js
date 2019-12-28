import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
configure({ adapter: new Adapter() });

import React from 'react';
import {shallow} from 'enzyme';
import TextHighlighter from '../src/TextHighlighter';
import sinon from 'sinon';

describe("Highlights first or all occurences of searched word",()=>{
    let props = {
        search:"tex",
    }
    it("should render successfuly with mandatory props",()=>{
        const highlighter = shallow(<TextHighlighter {...props}>This is a test text</TextHighlighter>);
        expect(highlighter).toMatchSnapshot();
    });

    it('should have children elements', function() {
        const highlighter = shallow(<TextHighlighter search="tes">This is a test text</TextHighlighter>);
        expect(highlighter.find(".thWrapper").children()).toHaveLength(3);
    });
    /**Setting base props */
    props['highlightClass'] = 'highlight';
    props['className'] = 'normal';
    it("should highlight words matched against the search string paased",()=>{
        const highlighter = shallow(<TextHighlighter {...props}>This is a test text</TextHighlighter>);
        expect(highlighter.find(".thWrapper")).toHaveLength(1);
        expect(highlighter.find(".highlight")).toHaveLength(1);
        expect(highlighter.find(".normal")).toHaveLength(2);
    });
     it("should highlight words matched against the search regex paased",()=>{
         props['search'] = /xt/;
        const highlighter = shallow(<TextHighlighter {...props}>This is a test text</TextHighlighter>);
        expect(highlighter.find(".thWrapper")).toHaveLength(1);
        expect(highlighter.find(".highlight")).toHaveLength(1);
        expect(highlighter.find(".normal")).toHaveLength(1);
    });
     it("should support array of strings in search",()=>{
         props['search'] = ['tex','tes'];
        const highlighter = shallow(<TextHighlighter {...props}>This is a test text</TextHighlighter>);
        expect(highlighter.find(".thWrapper")).toHaveLength(1);
        expect(highlighter.find(".highlight")).toHaveLength(2);
        expect(highlighter.find(".normal")).toHaveLength(3);
    });
     it('should allow empty search',()=>{
        props['search'] = [''];
        const highlighter = shallow(<TextHighlighter {...props}>This is a test text</TextHighlighter>);
        expect(highlighter.find(".thWrapper")).toHaveLength(1);
        expect(highlighter.find(".normal")).toHaveLength(0);
        expect(highlighter.find(".highlight")).toHaveLength(0);
     });
     
     it('should contains only one wrapper child element',()=>{
        const stub = sinon.stub(console,"error");
        const highlighter = shallow(<TextHighlighter {...props}><div></div><div></div></TextHighlighter>);
        expect(stub.calledOnce).toEqual(true);
        console.error.restore();
     });
     it('should contains valid react elements as children',()=>{
        const stub = sinon.stub(console,"error");
        const undef = [1];
        const highlighter = shallow(<TextHighlighter {...props}>{undef}</TextHighlighter>);
        expect(stub.calledOnce).toEqual(true);
        console.error.restore();
     });

     it("should highlight elements with the html tree passed as children",()=>{
        props['search'] = 'test';
        const highlighter = shallow(<TextHighlighter {...props}><div><div><span>This is a test statement to test this test case</span></div></div></TextHighlighter>);
        expect(highlighter.find(".normal")).toHaveLength(4);
        expect(highlighter.find(".highlight")).toHaveLength(3);
     });

     it("should support case sensitive searches",()=>{
        props['isCaseSensitive'] = true;
        props['search'] = 'TEST';
        const highlighter = shallow(<TextHighlighter {...props}><div><div><span>This is a TEST statement to test this test case</span></div></div></TextHighlighter>);
        expect(highlighter.find(".normal")).toHaveLength(2);
        expect(highlighter.find(".highlight")).toHaveLength(1);
     });
     it("should support not global searches",()=>{
        props['isCaseSensitive'] = false;
        props['isGlobalSearch'] = false;
        let highlighter = shallow(<TextHighlighter {...props}><div><div><span>This is a TEST statement to test this test case</span></div></div></TextHighlighter>);
        expect(highlighter.find(".normal")).toHaveLength(2);
        expect(highlighter.find(".highlight")).toHaveLength(1);
        
     });

     it("allow empty html nodes",()=>{
        const highlighter = shallow(<TextHighlighter {...props}><span></span></TextHighlighter>);
        expect(highlighter.find(".highlight")).toHaveLength(0);
        expect(highlighter.find(".normal")).toHaveLength(0);
     });
     it("should work when search expressions donot match",()=>{
        const highlighter = shallow(<TextHighlighter {...props}>Hello world</TextHighlighter>);
        expect(highlighter.find(".thWrapper")).toHaveLength(1);
        expect(highlighter.find(".highlight")).toHaveLength(0);
        expect(highlighter.find(".normal")).toHaveLength(1);
     });
     it('should highlight whole text',()=>{
        props['search'] = "hello world";
        let highlighter2 = shallow(<TextHighlighter isGlobalSearch={false} search="Hello world" className="normal" highlightClass="highlight">Hello world</TextHighlighter>);
        expect(highlighter2.find(".normal")).toHaveLength(1);
        expect(highlighter2.find(".highlight")).toHaveLength(1);
        props['isGlobalSearch'] = true;
        const highlighter = shallow(<TextHighlighter {...props}>hello world</TextHighlighter>);
        expect(highlighter.find(".thWrapper")).toHaveLength(1);
        expect(highlighter.find(".normal")).toHaveLength(0);
        expect(highlighter.find(".highlight")).toHaveLength(1);
       
     });
     it("should escape search string ",()=>{
        props['isGlobalSearch'] = true;
        props['search'] = "test(";
       let highlighter = shallow(<TextHighlighter {...props}><div><div><span>This is a TEST statement to test this test case</span></div></div></TextHighlighter>);
       expect(highlighter.find(".normal")).toHaveLength(1);
       expect(highlighter.find(".highlight")).toHaveLength(0);
       
    });
    
});