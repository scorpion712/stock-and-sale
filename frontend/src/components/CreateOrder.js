import React from 'react';
import { Component } from 'react';
import Zoom from 'react-reveal/Zoom';
import {formatCurrency} from '../util';
import { connect } from 'react-redux';
import {createNewOrder} from '../actions/orderActions';

class CreateOrder extends Component {
 
    saveOrder(type) { 
        const order = {
            client: this.props.client,
            cartItems: this.props.cartItems,
            iva: this.props.client.client_category === "RESPONSABLE INS" || this.props.client.client_category === "RESPONSABLE INSCRIPTO" ?  
                this.props.cartItems.reduce((total_iva, item) => total_iva + (item.product_price * item.count * item.product_iva/100),0) 
                : 0,
            type: type,
            total: this.props.cartItems.reduce((total, item) => total + item.product_price * item.count,0),
            comprobante: "",
            delivered: 0
        } 
        this.props.createNewOrder(order); 
        this.props.resetClient();
        this.props.closeModal();
        //print tickets
    }

    render() {
        const {client, cartItems} = this.props;
        return (
            <Zoom> 
                <div className="order-details">
                    <h3 className="success-message">Confirmar Venta</h3>
                    <h2>Venta #{"numero de orden"}</h2>
                    <ul>
                        <li>
                            <div>Nombre:</div>
                            <div>{client.client_name}</div>
                        </li>
                        <li>
                            <div>Categoria:</div>
                            <div>{client.client_category}</div>
                        </li>
                        <li>
                            <div>CUIT:</div>
                            <div>{client.client_cuit}</div>
                        </li>
                        <li>
                            <div>Fecha:</div>
                            <div>{  
                                new Date().toLocaleDateString("es-ES")
                            }</div>
                        </li>
                        <li>
                            <div>TOTAL:</div>
                            <div>
                                {formatCurrency(cartItems.reduce((a,c) => a + c.product_price * c.count, 0))}
                            </div>
                        </li>  {
                            (client.client_category === 'RESPONSABLE INS' || client.client_category === 'RESPONSABLE INSCRIPTO') &&
                            <li>
                                <div>TOTAL IVA:</div>
                                <div>
                                    {/*
                                        cartItems.map((item) => (
                                            <p>{item.count + " - " + item.product_price + " - " + item.product_iva}</p>
                                        ))*/
                                    }
                                    {
                                        formatCurrency(cartItems.reduce((total_iva, item) => total_iva + (item.product_price * item.count * item.product_iva/100),0))
                                    }
                                </div>
                            </li>
                        }
                        <li>
                           <div className="create-order-btn">
                                <button className="btn-primary" onClick={() => this.saveOrder("fiscal")}>VENTA FISCAL</button>
                                <button className="btn-success" onClick={() => this.saveOrder("")}>VENDER</button>
                                <button className="btn-info" onClick={() => this.saveOrder("account")}>A CUENTA</button>
                           </div>
                        </li>
                    </ul>
                </div>
            </Zoom> 
        )
    }  
}

export default connect((state) => ({}), {
    createNewOrder
})(CreateOrder);