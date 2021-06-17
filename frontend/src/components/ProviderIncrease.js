import { connect } from 'react-redux';
import React, { Component } from 'react'
import {increaseProvider} from '../actions/providerActions'

class ProviderIncrease extends Component {

    constructor(props) {
        super(props);
        this.state = {
            percent: 0
        }
    }

    handleInput = (e) => {
        if (e.target.value > 100) {
            e.target.value = 100;
        }
        this.setState({percent: e.target.value})
    }

    increaseProvider = (e)=> {
        e.preventDefault();
        this.props.increaseProvider(this.props.prov_id,this.state.percent);
        this.props.closeModal();
    }

    render() {
        return (
            <div className="modal-body" > 
                <form onSubmit={this.increaseProvider}> 
                    Porcentaje aumento  
                    <input type="number" min="0" max="100" name="percent" className="form-control" onChange={this.handleInput} /> 
                    <br></br>
                    <div>
                        <button type="submit" className="btn btn-primary btn-lg pull-left">Guardar</button>
                    </div>  
                </form> 
            </div> 
        )
    }
}

export default connect((state)=>({}), {
    increaseProvider
})(ProviderIncrease);
  
  