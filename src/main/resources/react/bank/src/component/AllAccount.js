import {Component} from 'react';
import {Form, Label, Input, Button, Col, FormGroup
        , Modal, ModalHeader, ModalBody, ModalFooter, Table} from 'reactstrap';
import axios from 'axios';
class AllAccount extends Component {
    constructor(props) {
        super(props);

        this.divStyle = {
              width:'600px'
            , height: '600px'
            , textAlign: 'left'
            , margin: '100px auto'
            , border: '2px solid gray'
            , padding: '30px'
            , borderRadius: '20px'
        };
        this.state = {
              modal:false
            , acc: []
        }
    }


    componentDidMount() {
        axios.get('http://localhost:8090/all')
        .then((response) => {
            this.setState({acc: response.data})
        })
        .catch((error)=>{
            console.log(error)
            
        });

    }

    render(){
        return(
                <div style={this.divStyle}>
                    <Table>
                        <tr>
                            <th>아이디</th>
                            <th>이름</th>
                            <th>잔액</th>
                            <th>등급</th>
                        </tr>
                        {/* map은 각각의 요소마다 return한다. */}
                        {this.state.acc.map((acc) => {
                            console.log(acc);
                            return (
                            <tr ley={acc.id}>
                                <td>{acc.id}</td>
                                <td>{acc.name}</td>
                                <td>{acc.balance}</td>
                                <td>{acc.grade}</td>
                            </tr>
                            )
                        })}
                    </Table>

                </div>
            )
        }
}

export default AllAccount;