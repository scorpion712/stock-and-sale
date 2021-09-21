import React, { Component } from 'react'
import {formatCurrency} from '../util';
import Fade from 'react-reveal/Fade';

import { connect } from 'react-redux'; 
import {removeFromCart, removeFromCartId} from '../actions/cartActions'; 
import OrderCreateModal from '../modals/OrderCreateModal';
/*
import {createOrder, clearOrder} from '../actions/orderActions';
*/

class Cart extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            open_modal: false
        }
    }

    getIVA() {
        const {cartItems, client} = this.props;
        let iva = 0;
        cartItems.forEach(element => {
            switch (client.client_category) {
                case "RESPONSABLE INS":
                    iva += element.product_price * element.product_iva/100 * element.count;
                    break;
                case "RESPONSABLE NO INS":
                    break;
                case "MONOTRIBUTISTA":
                    break;
                case "EXENTO":
                    break;
                case "CONSUMIDOR FINAL":
                    break;
                default: break;
            }
        }); 
        return iva;
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    createOrderModal = (client) => {
        this.setState({open_modal: true});
    }

    closeModal = () => {
        this.setState({open_modal: false}); 
    }
 
    render() {
        // eslint-disable-next-line
        const {cartItems, client} = this.props; // get cartItems and order from App.js 
        return (
            <div> 
                {  
                    cartItems.length === 0 ? 
                        <div className="cart cart-header">No ha cargado productos</div> 
                    : 
                        <div className="cart cart-header">Tiene {cartItems.length} en el carrito</div>
                } 
                <div>
                    <div className="cart">
                        <Fade left cascade>
                            <ul className="cart-items">
                                {
                                cartItems.map(item => (
                                    <li key={item._id}> 
                                        <div>
                                            <div>{item.product_description}</div>
                                            <div className="right">
                                                {formatCurrency(item.product_price)} x {item.count} {" "}
                                                <button title="Quitar 1 unidad" className="btn-lg btn-info" onClick={() => {this.props.removeFromCart(item)}}><i class="fas fa-minus-circle"></i></button>
                                                <button title="Quitar artíulo/s" className="btn-lg btn-danger" onClick={() => { this.props.removeFromCartId(item)}}><i class="fas fa-trash-alt"></i></button>
                                            </div>
                                        </div>
                                    </li>
                                ))
                               }
                            </ul>
                        </Fade>
                    </div>
                    <div> {
                        client && 
                        <div className="cart">
                            <div className="total">
                                <div>
                                    Total:{" "}
                                    {formatCurrency(cartItems.reduce((a,c) => a + c.product_price * c.count, 
                                    0)) }
                                </div>
                                <button className="button-primary" onClick={() => {this.createOrderModal(client)}}>
                                    Finalizar Venta
                                </button>
                            </div>
                                <div>
                                    IVA: {formatCurrency(this.getIVA())}
                                </div>
                        </div>
                    }
                    </div>
                </div>
                {
                    this.state.open_modal && 
                    <OrderCreateModal client={client} cartItems={cartItems}  closeModal={this.closeModal} resetClient={this.props.resetClient}></OrderCreateModal>
                }
            </div> 
        )
    }
}

export default connect((state) => ({
        cartItems: state.cart.cartItems
    }), {
        removeFromCart,
        removeFromCartId 
    })(Cart);