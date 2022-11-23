import {Component} from 'react';

class Section0 extends Component {
    render() {
        return(             
            <div className="seccion_main">
                <div className="intro_main">
                    <h3 className="title_main">
                        이미 모두의 은행<br/>지금은 토토뱅크
                    </h3>
                    <p className="title_sub1">
                        한 사람, 한 사람을 위해 시작한 은행이<br/>
                        더 많은 사람들이 찾는 모두의 은행이 되었습니다.
                    </p>
                    <p className="title_sub2">
                        보내고, 받고, 모으로, 쓰는<br/>
                        당신의 모든 일이 바뀌고 있습니다.
                    </p>
                    <img src={require("../img/main-bg3.png")} width="100%"/>
                </div>
            </div>
        )
    }

}

export default Section0;