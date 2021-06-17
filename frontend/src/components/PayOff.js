import React, { Component } from 'react'
import Zoom from 'react-reveal/Zoom'
import {connect} from 'react-redux'
import {payOff} from '../actions/orderActions'
import {formatCurrency} from '../util';

class PayOff extends Component {

    constructor(props) {
        super(props);
        this.state = {
            delivered: 0
        }
    }

    payOff = () => {
        const pay = {
            delivered: this.state.delivered,
            sale_id: this.props.sale_id
        }
        console.log(pay);
        this.props.payOff(pay); 
        this.props.closeModal();
    }

    handleInput = (e) => {
        if (e.target.value > (Number(this.props.total)-Number(this.props.delivered))) {
            e.preventDefault();
            this.setState({delivered: (Number(this.props.total)-Number(this.props.delivered))});
        } else {
            this.setState({[e.target.name]: e.target.value});
        }
    } 

    render() {
        const {total,delivered} = this.props;
        return (
            <Zoom>
                <div className="order-details">
                    <ul>
                        <li>
                            <div>Total: </div>
                            <div>{formatCurrency(total)}</div>
                        </li>
                        <li>
                            <div>Haber:</div>
                            <div>{formatCurrency(Number(total) - Number(delivered))}</div>
                        </li>
                        <li>
                            <div>Saldar:</div>
                            <div>
                                <input type="text" name="delivered" pattern="[0-9]" className="form-control" onChange={this.handleInput}></input>
                            </div>
                        </li>
                        <li>
                            <button className="btn-success" onClick={()=>this.payOff()}>SALDAR</button>
                        </li>
                    </ul> 
                </div>
            </Zoom>
        )
    }
}

export default connect((state)=>({}), {
    payOff
})(PayOff);
