import React, { Component } from 'react'
import {connect} from 'react-redux' 
import {fetchSales} from '../actions/orderActions'
import {formatCurrency} from '../util';
import Spinner from './Spinner';
import $ from 'jquery'
//Datatable Modules 
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import ModalDetailSale from '../modals/ModalDetailSale';

class SalesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open_modal: false,
            sale_id: -1
        }
    }

    componentDidMount() {
        this.props.fetchSales();
        $(document).ready(function (e) { $("#my_datatable").DataTable({
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

    openModal(id) {
        this.setState({open_modal: true, sale_id: id});
    }

    closeModal = () => {
        this.setState({open_modal: false});
    }

    printSale = () => {
        alert("Printing");
    }

    render() {
        const {open_modal, sale_id} = this.state;
        return (
            <div>
                { !this.props.sales ? <Spinner></Spinner> : 
                    <table id="my_datatable" className="display table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>Fecha</th>
                                <th>Cliente</th>
                                <th>Total</th>
                                <th>IVA</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.sales.map((sale) => (
                                <tr key={sale.sale_id}>
                                    <td>{new Date(sale.sale_date).toLocaleDateString("es-ES")}</td>
                                    <td>{sale.client_name + " - " + sale.client_category}</td>
                                    <td>{formatCurrency(sale.sale_total)}</td>
                                    <td>{formatCurrency(sale.iva)}</td>
                                    <td>
                                        <button title="Ver detalle" className="btn-success btn" onClick={() => this.openModal(sale.sale_id)}><i className="fas fa-search-dollar"></i></button>
                                        <button title="Re imprimir ticket" className="btn-primary btn" onClick={() => alert("re imprimir ticket")}><i className="fas fa-print"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>  
                
                }
                {
                    open_modal &&
                        <ModalDetailSale 
                            closeModal={this.closeModal}
                            printSale={this.printSale}
                            sale_id={sale_id}
                            type="sale"> 
                        </ModalDetailSale>
                }
            </div>
        )
    }
}

export default connect (
    (state) => ({sales: state.order.order}), {
        fetchSales
    }
)(SalesList);