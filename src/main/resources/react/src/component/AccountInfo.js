import axios from 'axios';
import {Component} from 'react';
import {Form, Label, Input, Button, Col, FormGroup
    , Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
class AccountInfo extends Component {
    constructor(props) {
        super(props)
        this.divStyle = {
              width: '480px'
            , height: '280px'
            , textAlign: 'left'
            , margin: '100px auto'
            , border: '2px solid gray'
            , padding: '30px'
            , borderRadius: '20px'
        };

        this.state ={
            modal:false
            , acc:{
                  id : ''
                , name : ''
                , balance : ''
                , grade : ''
            }
            , msg_hader:''
            , msg_body:''
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



    submit = (e) => {
        console.log("실행됨")
        console.log(this.state.acc.id);
        axios.post("http://localhost:8090/accinfo",null,{params:{id:this.state.acc.id}})
        .then((response) => {
            console.log(response.data);
            var racc = response.data;
            this.setState({acc:racc});
        }).catch((error) => {
            console.log(error);
                this.setState({msg_header:'오류', msg_body:'계좌번호가 틀립니다.'})
                this.toggle();

        })
    }
    

    render() {
        return(
            <div style={this.divStyle}>
                <Form>
                    <FormGroup row>
                        <Label for="id" sm={4}>계 좌  번 호</Label>
                        <Col sm={4}>
                            <Input type="text" name="id" id="id" value={this.state.acc.id || ''} onChange={this.change}/>
                        </Col>
                        <Col sm={4}>
                            <Button color='primary' style={{width:'100%'}} onClick={this.submit}>계좌조회</Button>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                            <Label for='name' sm={4}>이&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;름</Label>
                            <Col sm={8}>
                                <Input type='text' name='name' id='name' value={this.state.acc.name || ''} readOnly/>
                            </Col>
                    </FormGroup>
                    <FormGroup row>
                            <Label for='balance' sm={4}>잔&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;액</Label>
                            <Col sm={8}>
                                <Input type='text' name='balance' id='balance' value={this.state.acc.balance && ''} readOnly/>
                            </Col>
                    </FormGroup>
                    <FormGroup row>
                            <Label for='grade' sm={4}>등&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;급</Label>
                            <Col sm={8}>
                                <Input type='text' name='grade' id='grade' value={this.state.acc.grade || ''} readOnly/>
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

export default AccountInfo;