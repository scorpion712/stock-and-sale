import React, { Component } from 'react'
import {connect} from 'react-redux'
import {editProduct} from '../actions/productActions'
import { checkDouble } from '../util';

class EditProduct extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            product_description: "",
            product_category:  "",
            provider_name: "",
            product_price: "",
            product_iva: "" 
        }
    }

    handleInput = (e) => { 
        this.setState({[e.target.name]: e.target.value});
    }

    editProduct = (e) => {
        e.preventDefault(); 
        let {p} = this.props;  
        p.product_description = this.state.product_description || p.product_description;
        p.product_category = this.state.product_category || p.product_category;
        p.provider_name = this.state.provider_name || p.provider_name;
        p.product_price = Number(parseFloat(this.state.product_price).toFixed(2)) || Number(parseFloat(p.product_price).toFixed(2));
        p.product_iva = (this.state.product_iva || p.product_iva) > 100 ? 100 :(this.state.product_iva || p.product_iva) ;  
        this.props.editProduct(p); 
        this.props.closeModal();
    }

    onKeyPressIVA = (e) => {
        let {product_iva} = this.state;
        if (product_iva > 100) {
            this.setState({product_iva: 100});
            product_iva = 100;
        }
        return checkDouble(e);
    }

    onKeyPressPrice = (e) => {
        return checkDouble(e);
    }

    render() {
        const {p, closeModal} = this.props;
        return (
            <div className="modal-body" > 
                <form onSubmit={this.editProduct}>
                    Descripción
                    <input type="text" name="product_description" defaultValue={p.product_description} className="form-control" onChange={this.handleInput}/>
                    Categoría
                    <input type="text" name="product_category" defaultValue={p.product_category} className="form-control" onChange={this.handleInput}/>
                    Proveedor
                    <input type="text" name="provider_name" defaultValue={p.provider_name} className="form-control" onChange={this.handleInput}/>
                    Precio venta
                    <input type="text" name="product_price" pattern="[0-9]+([\.,][0-9]+)?" defaultValue={Number(parseFloat(p.product_price).toFixed(2))} className="form-control" onChange={this.handleInput} onKeyPress={this.onKeyPressPrice}/>
                    IVA 
                    <input type="text" name="product_iva" defaultValue={p.product_iva} className="form-control" onChange={this.handleInput} onKeyPress={this.onKeyPressIVA}/>
                    <br></br> 
                    <div>
                        <button type="submit" className="btn btn-primary btn-lg pull-left">Guardar</button>
                        <button className="btn btn-danger btn-lg pull-right" onClick={closeModal}>Cancelar</button>
                    </div>  
                </form> 
            </div> 
        )
    }
}

export default connect((state) => ({}), { 
    editProduct
})(EditProduct);