 
import React, { Component } from 'react'  
import Modal from 'react-bootstrap/Modal'
import {connect} from 'react-redux'
import {createClient, fetchClients} from '../actions/clientActions'
import Fade from 'react-reveal/Fade'

class Client extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            showClientModal: false,
            client_name: "" ,
            client_address: "",
            client_phone: "", 
            client_cuit: "",
            client_category: "",
            client_email: "",   
            client_city: "",
            client_postal: ""
        }
    }

    componentDidMount() {
        this.props.fetchClients();
    }

    openModal() {
        this.setState({showClientModal: true});
    }

    closeModal = () => { 
        this.setState({showClientModal: false});
    }

    handleInput = (e) => {
        const isValid = e.target.validity.valid;  // use this to validate phone field
        if (isValid) {
            this.setState({[e.target.name]: e.target.value});
        }
    }

    createClient = (e) => {
        e.preventDefault();
        const client = {
            client_name: this.state.client_name, 
            client_address: this.state.client_address,
            client_phone: this.state.client_phone,
            client_cuit: this.state.client_cuit,
            client_category: this.state.client_category,
            client_email: this.state.client_email,   
            client_city: this.state.client_city,
            client_postal: this.state.client_postal
        }
        this.props.createClient(client);
        this.props.handleClient(client);
        this.closeModal();
    }

    handleChange = (e) => {
        let value = e.target.value;  
        if (value.length === 0) {
            this.setState({suggestions: [], client_name: e.target.value});
        } else {
            const regex = new RegExp(`^${value}`, 'i');
            this.setState({suggestions: this.props.clients.slice().filter(c => regex.test(c.client_name)), client_name: e.target.value});
        }
        this.props.handleClient(this.props.clients.filter(c => value === c.client_name));
    }

    suggestionSelected(selected_suggestion) {
        this.setState({suggestions: [], client_name: selected_suggestion});
        this.props.handleClient(this.props.clients.filter(c => selected_suggestion === c.client_name));
    }

    renderSuggestions() {
        const {suggestions} = this.state; 
        if (suggestions.length > 0) {
            return ( 
                <ul className="client_search">
                    {suggestions.map((item) => <li className="client_search_li" onClick={() => this.suggestionSelected(item.client_name)}>{item.client_name}</li>)}
                </ul> 
            ) 
        }
        return null;
    }

    resetClient() {
        this.setState({client_name: ""});
    }

    render() {
        const {showClientModal} = this.state; 
        const {reset_client} = this.props;
        return ( 
            <Fade>
                <div className="row client">
                    <div className="col-md-9"> 
                        <input type="text" placeholder="Nombre Cliente..." defaultValue={reset_client ? "" : this.state.client_name} className="form-control" onChange={this.handleChange}></input>
                        {this.renderSuggestions()}
                    </div> 
                    <div className="col-md-3">
                        <button className="btn btn-primary" onClick={() => {this.openModal()}}>Nuevo Cliente</button>
                    </div>
                    {
                        showClientModal &&  
                            <Modal show={true} onHide={this.closeModal}>  
                                <div className="modal-header">
                                    <h5 className="modal-title">Nuevo Cliente</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body" > 
                                <form onSubmit={this.createClient}>
                                    Nombre y Apellido
                                    <input type="text" name="client_name" required className="form-control" onChange={this.handleInput}/>
                                    Direccion
                                    <input type="text" name="client_address" className="form-control" onChange={this.handleInput}/>
                                    Teléfono
                                    <input type="text" pattern="[0-9]{0,13}" name="client_phone" className="form-control" onChange={this.handleInput}/>
                                    CUIT
                                    <input type="text" pattern="[0-9]{0,13}" name="client_CUIT" className="form-control" onChange={this.handleInput}/>
                                    Categoria
                                    <input type="text" required name="client_category" className="form-control" onChange={this.handleInput}/>
                                    Email
                                    <input type="email" name="client_email" className="form-control" onChange={this.handleInput}/>
                                    Ciudad
                                    <input type="text" name="client_city" className="form-control" onChange={this.handleInput}/>
                                    Cod. Postal
                                    <input type="text" pattern="[0-9]{0,13}" name="client_postal" className="form-control" onChange={this.handleInput}/>
                                    <br></br>
                                    <div>
                                        <button type="submit" className="btn btn-primary btn-lg pull-left">Guardar</button>
                                        <button className="btn btn-danger btn-lg pull-right" onClick={this.closeModal}>Cancelar</button>
                                    </div>  
                                </form>
                                    
                                </div> 
                        </Modal>
                    } 
                </div>
            </Fade> 
        )
    }
}

export default connect((state) => ({clients: state.client.clients}), {
    fetchClients,
    createClient
})(Client); 
