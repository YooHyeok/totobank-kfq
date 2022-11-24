import {Component} from 'react';
import Section0 from './Section0';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';
import Section5 from './Section5';
import Section6 from './Section6';
import Section7 from './Section7';
class Main extends Component {
    render() {
        return(
            <div className='main'>
                <Section0/> 
                <Section1/> 
                <div className='bar'></div>
                <Section2/> 
                <div className='bar'></div>
                <Section3/>
                <div className='bar'></div>
                <Section4/>
                <div className='bar'></div>
                <Section5/>
                <Section6/>
                <Section7/>
            </div>
        )
    }
}

export default Main;