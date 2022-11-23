import {Component} from 'react';
import { Button } from 'reactstrap';

class Section2 extends Component {
    render() {
        return(
            <div className='section_main'>
                <div className='section_left'>
                    <div className='textBox' style={{float:'right', paddingTop:"12%"}}>
                        <span className='L-text'>
                            우대조건 없이<br/>
                            합리적인 예금과 적금
                        </span>
                        <span className='S-text'>
                            기대했던 금리와 다르게 복잡한 우대조건에 실망한 적이 있었나요?<br/>
                            토토뱅크의 예금, 적금은 숨겨진 우대조건 없이 누구에게나<br/>
                            편리하고 합리적입니다.
                        </span><br/>
                        <Button color="light" size='sm'>정기예금&gt;</Button>&nbsp;&nbsp;
                        <Button color="light" size='sm'>자유적금&gt;</Button><br/><br/>
                        <img src={require('../img/main-savings-money.png')}
                            height='100px' width='422px' alt=''/>
                    </div>
                </div>
                <div className='section_right'>
                    <div className="imgBox" style={{float:'left'}}>
                        <img src={require('../img/main-savings.png')}
                            height='720px' width='410px' alt=''/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Section2;