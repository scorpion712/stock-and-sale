import React, { Component } from 'react'
import {connect} from 'react-redux'
import {editProvider} from '../actions/providerActions'
import {checkCUIT, checkPhone, checkPostal} from '../util'

class EditProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prov: this.props.prov 
        }
    }

    editProvider = (e) => {
        e.preventDefault(); 
        this.props.editProvider(this.state.prov); 
        this.props.closeModal();
    }

    handleInput = (e) => { 
        let {prov} = this.state;   
        prov[e.target.name] = e.target.value;
        this.setState({prov: prov});  
    }   

    onKeyPressCUIT = (e) => { 
        let {prov} = this.state;    
        return checkCUIT(prov["provider_cuit"], e);
     }

     onKeyPressPhone = (e) => { 
        let {prov} = this.state;    
        return checkPhone(prov["provider_phone"], e);
    }

    onKeyPressPostal = (e) => { 
        let {prov} = this.state;
        return checkPostal(prov["provider_postal"], e);
   } 

    render() {
        const {prov} = this.props;
        return (
            <div class="modal-body" > 
                <form onSubmit={this.editProvider}>
                    Nombre Proveedor
                    <input type="text" defaultValue={prov.provider_name} name="provider_name" className="form-control" onChange={this.handleInput}/>
                    Dirección
                    <input type="text" defaultValue={prov.provider_address} name="provider_address" className="form-control" onChange={this.handleInput}/>
                    Ciudad
                    <input type="text" defaultValue={prov.provider_city} name="provider_city" className="form-control" onChange={this.handleInput}/>
                    Teléfono
                    <input type="text" defaultValue={prov.provider_phone} name="provider_phone" pattern="[0-9]{0,13}" className="form-control" onChange={this.handleInput}  onKeyPress={this.onKeyPressPhone}/>
                    Email
                    <input type="email" defaultValue={prov.provider_email} name="provider_email" className="form-control" onChange={this.handleInput}/>
                    CUIT
                    <input type="text" defaultValue={prov.provider_cuit} name="provider_cuit" className="form-control" onChange={this.handleInput} onKeyPress={this.onKeyPressCUIT}/>
                    Código Postal
                    <input type="text" defaultValue={prov.provider_postal} name="provider_postal" pattern="[0-9]{0,13}" className="form-control" onChange={this.handleInput} onKeyPress={this.onKeyPressPostal}/>
                    <br></br>
                    <div>
                        <button type="submit" className="btn btn-primary btn-lg pull-left">Guardar</button>
                    </div>  
                </form> 
            </div> 
        )
    }
}
export default connect ((state) => ({}), { 
    editProvider 
})(EditProvider);
