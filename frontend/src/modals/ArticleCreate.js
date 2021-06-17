import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createNewProduct} from "../actions/productActions"
import {fetchProviders} from "../actions/providerActions"

class ArticleCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            product_description: "",
            product_category:  "",
            product_provider: "",
            product_price: "",
            product_price2: "",
            product_price3: "",
            suggestions: []
        }
    }

    componentDidMount = () => {
        this.props.fetchProviders();
    }

    createNewProduct = (e) => {
        e.preventDefault(); 
        const product = { 
            description: this.state.product_description,
            category: this.state.product_category,
            provider_name: this.state.provider_name,
            price: this.state.product_price,
            price2: this.state.product_price2,
            price3: this.state.product_price3
        }
        this.props.createNewProduct(product);
        this.props.closeModal();
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleChange = (e) => {
        let value = e.target.value;  
        if (value.length === 0) {
            this.setState({suggestions: [], provider_name: e.target.value});
        } else {
            const regex = new RegExp(`^${value}`, 'i');
            this.setState({suggestions: this.props.providers.slice().filter(c => regex.test(c.provider_name)), provider_name: e.target.value});
        } 
    }

    suggestionSelected(selected_suggestion) {
        this.setState({suggestions: [], provider_name: selected_suggestion}); 
    }

    renderSuggestions() {
        const {suggestions} = this.state; 
        if (suggestions.length > 0) {
            return ( 
                <ul className="client_search">
                    {suggestions.map((item) => <li className="client_search_li" onClick={() => this.suggestionSelected(item.provider_name)}>{item.provider_name}</li>)}
                </ul> 
            ) 
        }
        return null;
    }

    render() {
        return ( 
            <div className="modal-body" > 
                <form onSubmit={this.createNewProduct}> 
                    Descripción
                    <input type="text" name="product_description" className="form-control" onChange={this.handleInput}/>
                    Categoría
                    <input type="text" name="product_category" className="form-control" onChange={this.handleInput}/>
                    Proveedor
                    <input type="text" name="provider_name" value={this.state.provider_name} className="form-control" onChange={this.handleChange}/>
                    {this.renderSuggestions()}
                    Precio venta
                    <input type="text" name="product_price" pattern="[0-9]{0,13}" className="form-control" onChange={this.handleInput}/>
                    IVA 
                    <input type="text" name="product_iva" pattern="[0-9]{0,13}" className="form-control" onChange={this.handleInput}/>
                    <br></br>
                    <div>
                        <button type="submit" className="btn btn-primary btn-lg pull-left">Guardar</button>
                    </div>  
                </form> 
            </div>  
        )
    }
}

export default connect((state) => ({providers: state.providers.providers}), {
    createNewProduct,
    fetchProviders
})(ArticleCreate); 