import {Component} from 'react';
import {Form, Label, Input, Button, Col, FormGroup
        , Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import axios from 'axios';
class MakeAccount extends Component {
    constructor(props) {
        super(props);

        this.divStyle = {
              width:'480px'
            , height: '330px'
            , textAlign: 'left'
            , margin: '100px auto'
            , border: '2px solid gray'
            , padding: '30px'
            , borderRadius: '20px'
        };
        this.state = {
              modal:false
            , acc:{
                  id:''
                , name:''
                , password:''
                , grade:''
            }
            , msg_header:''
            , msg_body:''
            , special:false /* 특수계좌여부 */
        }
    }
    /* 모달창 */
    toggle = () => {
        this.setState({modal:!this.state.modal})
    }

    /* 사용자가 입력한 값을 변수에 담는다. */
    change = (e) => {
        console.log("change()")
        /* 이벤트가 발생한 태그의 name속성과 value속성을 가지고온다. ex)password:value */
        const name = e.target.name;
        const value = e.target.value;
        console.log("이름,값 : ",name,value)
        this.setState({acc:{...this.state.acc, [name]:value}})
    }
    /* 이벤트 함수 - 클릭시  */
    changeSpecial = (e) => { 
        console.log("changeSpecial()")
        this.setState({special:e.target.checked})
        if(!e.target.checked) {/* 체크여부가 false일때 */
            this.setState({acc:{...this.state.acc, grade:''}})
        }
    }

    isExistsById = () => {
        axios.post("http://localhost:8090/existsid",null,{params:{id:this.state.acc.id}})
        .then((response) => {
            console.log("탔어")
            console.log(response.data);
            // let msg = '';
            var msg = response.data == true ? '사용중인 계좌번호 입니다.' : '사용 가능한 계좌번호입니다.';
            this.setState({msg_header:'계좌 중복 확인', msg_body:msg})
            this.toggle();
        }).catch((error) => {
            console.log(error);
            this.setState({msg_header:'오류', msg_body:'중복 계좌 확인에 실패했습니다.'})
            this.toggle();
        })
    }

    submit = (e) => {
        console.log("submit()")
        console.log(JSON.stringify(this.state.acc))
        /* npm install -s axios */
        /* 
            버튼 클릭시 acc의 값을 JSON형태로 변환 후 POST방식으로 전송
            성공시 : then / 실패시 : catch 
        // */
        // axios.post('http://localhost:8090/makeaccount', null, {acc:JSON.stringify(this.state.acc)}
        axios.post('http://localhost:8090/makeaccount', null, {params:this.state.acc}
        ).then((response) => {
            this.setState({msg_header:'계좌개설', msg_body:'계좌가 개설되었습니다.'})
            this.toggle();
        }).catch((error)=>{
            console.log(error)
            this.setState({msg_header:'오류', msg_body:'계좌개설에 실패했습니다.'})
            this.toggle();
            
        });

    }

    render(){
        return(
                <div style={this.divStyle}>
                    <Form>

                        <FormGroup row>
                            {/* sm속성은 비율 즉, 4:6:2 = 12 */}
                            <Label for='id' sm={4}>계 좌&nbsp; 번 호</Label>
                            <Col sm={5}>
                                <Input type='text' name='id' id='id' value={this.state.acc.id} 
                                        onChange={this.change}/>
                            </Col>
                            <Col sm={3} >
                                <Button color='primary' style={{width:'100%'}} onClick={this.isExistsById}>중복</Button>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='name' sm={4}>이&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;름</Label>
                            <Col sm={8}>
                                <Input type='text' name='name' id='name' value={this.state.acc.name} 
                                        onChange={this.change}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='password' sm={4}>비 밀&nbsp; 번 호</Label>
                            <Col sm={8}>
                                <Input type='text' name='password' id='password' value={this.state.acc.password} 
                                        onChange={this.change}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='grade' sm={4}>
                                <Input type='checkbox' checked={this.state.special} 
                                        onChange={this.changeSpecial}/> {' '}특수계좌
                            </Label>
                            <Col sm={8} >
                                <Input type='select' name='grade' id='grade' disabled={!this.state.special} style={{color:'gray'}} 
                                        onChange={this.change}>
                                    <option>VIP</option>
                                    <option>Gold</option>
                                    <option>Silver</option>
                                    <option>Normal</option>

                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={12}>
                                <Button style={{width:'100%'}} color='primary'
                                        onClick={this.submit}>계좌 개설</Button>
                            </Col>
                        </FormGroup>
                        
                    </Form>
                    <Modal isOpen={this.state.modal} fade={true} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>{this.state.msg_header}</ModalHeader>
                        <ModalBody>
                            {this.state.msg_body}
                        </ModalBody>
                        <ModalFooter color="secondary" onClick={this.toggle}>
                            <Button color='secondary'>닫기</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            )
        }
}

export default MakeAccount;