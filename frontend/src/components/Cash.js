import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchCash} from '../actions/cashActions'
import { formatCurrency } from '../util';
import Spinner from './Spinner';

class Cash extends Component {

    componentDidMount() {
        this.props.fetchCash();
    }

    render() {
        return ( 
            <div className="col-md-12 cash cash-effective">
            <p>Total</p>
            {!this.props.cash ? <Spinner></Spinner>
             : this.props.cash.map(cash => (
                <p>{formatCurrency(!cash.cash ? 0 : cash.cash)}</p>
            ))} 
            </div>
        )
    }
}

export default connect((state)=>({cash: state.cash.cash}), {
    fetchCash
})(Cash); 