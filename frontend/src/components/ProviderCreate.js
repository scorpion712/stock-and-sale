import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createNewProvider} from '../actions/providerActions'

class ProviderCreate extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            provider_name: "",
            provider_address: "",
            provider_city: "", 
            provider_phone: "",
            provider_email: "",
            provider_cuit: "",
            provider_postal: ""
        }; 
    }
 
    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    } 

    createNewProvider = (e) => {
        e.preventDefault();
        const newProvider = {
            provider_name: this.state.provider_name,
            provider_address: this.state.provider_address,
            provider_city: this.state.provider_city, 
            provider_phone: this.state.provider_phone,
            provider_email: this.state.provider_email,
            provider_cuit: this.state.provider_cuit,
            provider_postal: this.state.provider_postal
        }
        this.props.createNewProvider(newProvider);
        this.props.closeModal();
    }
    
    render() {
        return (
            <div className="modal-body" > 
                <form onSubmit={this.createNewProvider}> 
                    Nombre Proveedor
                    <input type="text" name="provider_name" className="form-control" onChange={this.handleInput}/>
                    Dirección
                    <input type="text" name="provider_address" className="form-control" onChange={this.handleInput}/>
                    Ciudad
                    <input type="text" name="provider_city" className="form-control" onChange={this.handleInput}/>
                    Teléfono
                    <input type="text" name="provider_phone" pattern="[0-9]{0,13}" className="form-control" onChange={this.handleInput}/>
                    Email
                    <input type="email" name="provider_email" className="form-control" onChange={this.handleInput}/>
                    CUIT
                    <input type="text" name="provider_cuit" pattern="[0-9]{0,13}" className="form-control" onChange={this.handleInput}/>
                    Código Postal
                    <input type="text" name="provider_postal" pattern="[0-9]{0,13}" className="form-control" onChange={this.handleInput}/>
                    <br></br>
                    <div>
                        <button type="submit" className="btn btn-primary btn-lg pull-left">Guardar</button>
                    </div>  
                </form> 
            </div> 
        )
    }
}

export default connect ((state) => ({}),{
    createNewProvider
})(ProviderCreate);