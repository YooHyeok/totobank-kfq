import {Component} from 'react';
import { Button } from 'reactstrap';

class Section4 extends Component {
    render() {
        return(
            <div className='section_main'>
                <div className='section_left'>
                    <div className='textBox' style={{float:'right', paddingTop:"28%"}}>
                        <span className="L-text">
                            함께 도전해서<br/>
                            재미있는 26주적금
                        </span><br/>
                        <span className="S-text">
                            26주동안 변화하는 재미에 빠져있는 사이<br/>
                            어느덧 만기 달성 경험을 맛보게 됩니다.
                        </span><br/>
                        <Button color='light' size='sm'>26주 적금&gt;</Button><br/>
                    </div>
                </div>
                <div className='section_right'>
                    <div className='imgBox' style={{float:'left', paddingTop:"20%"}}>
                        <img src={require('../img/main-26weeks.png')}
                            height='408px' width='520px' alt=''/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Section4;