import React, { Component } from 'react'
import Zoom from 'react-reveal/Zoom'
import {connect} from 'react-redux'
import { fetchSaleDetails } from '../actions/orderActions';
import {formatCurrency} from '../util';
import Spinner from './Spinner';

class DetailOrder extends Component {

    componentDidMount() {  
        this.props.fetchSaleDetails(this.props.sale_id, this.props.type);
    }

    render() {   
        return ( 
            <Zoom>
                {
                    !this.props.sales ? <tr> <Spinner></Spinner>  </tr>
                                    :  
                        <div className="order-details"> 
                            <ul>
                                <li>
                                    <div>Fecha:</div> 
                                    <div>{this.props.sales[0].sale_date}</div>
                                </li>
                                <li>
                                    <div>Cliente:</div> 
                                    <div>{this.props.sales[0].client_name}</div>
                                </li>
                                <li>
                                    <div>Categoria:</div> 
                                    <div>{this.props.sales[0].client_category}</div>
                                </li>
                                <li>
                                    <div>CUIT:</div> 
                                    <div>{this.props.sales[0].client_cuit}</div>
                                </li>
                                <li>
                                    <div>Articulos:</div>
                                    <div>
                                        <ul>{
                                            this.props.sales.map((line) => (
                                                <li>
                                                    {line.product_count + " - " + line.product_description + " x " + formatCurrency(line.price) + " - " + formatCurrency(line.total)} 
                                                </li>
                                            ))
                                        }
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <div>IVA:</div> 
                                    <div> 
                                        {formatCurrency(this.props.sales.reduce((total_iva, item) => total_iva + (item.price * item.product_count * item.iva/100),0))}
                                    </div>
                                </li>
                                <li>
                                    <div>TOTAL:</div> 
                                    <div>{formatCurrency(this.props.sales[0].sale_total)}</div>
                                </li>
                                <li>
                                <div className="create-order-btn">
                                    <button className="btn-primary" onClick={() => alert("imprimir")}>IMPRIMIR</button>
                                </div>
                                </li>
                            </ul>
                        </div>
            } 
            </Zoom>
        )
    }
}

export default connect((state) => ({sales: state.order.orders}), {
    fetchSaleDetails
})(DetailOrder);