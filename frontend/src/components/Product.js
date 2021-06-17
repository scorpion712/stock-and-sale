import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import {connect} from 'react-redux'
import {fetchProducts} from '../actions/productActions'
import {addToCart} from '../actions/cartActions'
import Spinner from '../components/Spinner' 
import {formatCurrency} from '../util' 
import $ from 'jquery'
//Datatable Modules 
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

class Product extends Component {
 
    constructor(props) {
        super(props);
        this.state = {adding_count: 1};
    }

    componentDidMount() {
        this.props.fetchProducts();  
        $("#my_datatable").DataTable({ 
            "deferRender": true,
            "retrieve": true,
            "processing": true,  
            "searching": true,
             "language": {

                    "sProcessing":     "Procesando...",
                    "sLengthMenu":     "Mostrar _MENU_ registros",
                    "sZeroRecords":    "No se encontraron resultados",
                    "sEmptyTable":     "Ningún dato disponible en esta tabla",
                    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
                    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
                    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix":    "",
                    "sSearch":         "Buscar...",
                    "sUrl":            "",
                    "sInfoThousands":  ",",
                    "sLoadingRecords": "Cargando...",
                    "oPaginate": {
                    "sFirst":    "Primero",
                    "sLast":     "Último",
                    "sNext":     "Siguiente",
                    "sPrevious": "Anterior"
                    },
                    "oAria": {
                        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                    }

            } 
        }); 
    }

    componentDidUpdate() { 
        $("#my_datatable").DataTable({ 
            "deferRender": true,
            "retrieve": true,
            "processing": true,  
            "searching": true,
             "language": {

                    "sProcessing":     "Procesando...",
                    "sLengthMenu":     "Mostrar _MENU_ registros",
                    "sZeroRecords":    "No se encontraron resultados",
                    "sEmptyTable":     "Ningún dato disponible en esta tabla",
                    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
                    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
                    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix":    "",
                    "sSearch":         "Buscar...",
                    "sUrl":            "",
                    "sInfoThousands":  ",",
                    "sLoadingRecords": "Cargando...",
                    "oPaginate": {
                    "sFirst":    "Primero",
                    "sLast":     "Último",
                    "sNext":     "Siguiente",
                    "sPrevious": "Anterior"
                    },
                    "oAria": {
                        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                    }

            } 
        });
    } 

    // check product count adding to cart 
    onChange = (e) => {
        if (e) {
            this.setState({adding_count: e.target.value});
        } else {
            this.setState({adding_count: 1});
        }
    }
 
    addToCart = (product) => {
        this.props.addToCart(product, this.state.adding_count); 
        this.setState({adding_count: 1}); 
        $("#adding_count" + product.product_code).val(1);
    }

    render() {
        return (
            <div className="row product-list">
                <Fade bottom cascade>
                    <div className="col-md-12">  
                                {!this.props.products ? <tr> <Spinner></Spinner>  </tr>
                                    :   
                        <table id="my_datatable" className="table table-striped table-bordered display"  >  
                            <thead className="thead-dark">
                                <tr className="product-th">
                                    <th>Cod</th>
                                    <th>Articulo</th>
                                    <th>Proveedor</th> 
                                    <th>$UD</th> 
                                    <th></th>
                                </tr>  
                            </thead>
                            <tbody>  {this.props.products.map((product) => (
                                    <tr key={product.product_code} className="product-row">
                                        <td>{product.product_code}</td>
                                        <td>{product.product_description}</td>
                                        <td>{product.provider_name}</td> 
                                        <td>{formatCurrency(product.product_price)}</td>
                                        <td className="td-product-add"> 
                                            <input className="input-group-text product-count pull-left" defaultValue={this.state.adding_count} type="number" min="1" id={"adding_count" + product.product_code} onChange={this.onChange}/>
                                            <button className="btn btn-success btn-xs pull-left" onClick={() => this.addToCart(product)}>
                                                    <i className="fas fa-cart-plus" aria-hidden="true"></i> 
                                            </button>
                                        </td> 
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        }
                    </div>
                </Fade> 
            </div>
        )
    }
};

export default connect((state) => ({products: state.products.items}), {
    fetchProducts,
    addToCart
})(Product);
