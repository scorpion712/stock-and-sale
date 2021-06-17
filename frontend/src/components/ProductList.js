import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import {connect} from 'react-redux'
import {fetchProducts, deleteProduct} from '../actions/productActions'
import {formatCurrency} from '../util'
import Spinner from './Spinner'  
import Modal from 'react-bootstrap/Modal'
import { ModalHeader } from '../modals/ModalHeader' 
import $ from 'jquery'
//Datatable Modules 
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import ModalEditProduct from '../modals/ModalEditProduct'

class ProductList extends Component {  
    constructor(props) {
        super(props);
        this.state = {
            open_modal: false,  
            p: null
        }
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

    openModal(product) { 
        this.setState({open_modal: true, p: product});
    }

    closeModal = () => { 
        this.setState({open_modal: false});
    }

    render() { 
        const {open_modal, p} = this.state;
        return (
            <div className="row product-list">
                <Fade bottom cascade>
                    <div className="col-md-12">  
                                {!this.props.products ? <tr> <Spinner></Spinner>  </tr>
                                    :  
                                <table id="my_datatable" className="table table-striped table-bordered display"  >  
                                    <thead className="thead-dark">
                                        <tr className="product-th">
                                            <th scope="col">Cod</th>
                                            <th scope="col">Articulo</th>
                                            <th scope="col">Proveedor</th>
                                            <th scope="col">$UD</th>  
                                            <th scope="col">%IVA</th>
                                            <th scope="col"></th>
                                        </tr>  
                                    </thead>
                                    <tbody> {this.props.products.map((product) => (
                                            <tr key={product.product_code} className="product-row">
                                                <td>{product.product_code}</td>
                                                <td>{product.product_description}</td>
                                                <td>{product.provider_name}</td>
                                                <td>{formatCurrency(product.product_price)}</td>
                                                <td>{product.product_iva+"%"}</td> 
                                                <td className="myclase">
                                                    <button className="btn btn-primary btn-xs pull-left" onClick={() => {this.openModal(product)} }>
                                                            <i className="fas fa-pencil-alt" aria-hidden="true"></i> 
                                                    </button>
                                                    <button className="btn btn-danger btn-xs pull-left" onClick={() => {this.props.deleteProduct(product.product_code)} }>
                                                            <i className="fas fa-trash-alt" aria-hidden="true"></i> 
                                                    </button> 
                                                </td> 
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                        }
                    </div>
                </Fade>  
                {
                    open_modal && 
                    <Modal show={true} onHide={this.closeModal} >  
                        <ModalHeader modal_title="Editar Artículo" closeModal={this.closeModal}></ModalHeader>
                        <ModalEditProduct closeModal={this.closeModal} p={p} ></ModalEditProduct>
                    </Modal>
                }
            </div>
        )
    } 
};

export default connect((state) => ({products: state.products.items}), {
    fetchProducts,
    deleteProduct 
})(ProductList);

