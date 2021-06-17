import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchAccounts} from '../actions/orderActions'
import Spinner from './Spinner';
import $ from 'jquery'
//Datatable Modules 
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"  
import ModalDetailSale from '../modals/ModalDetailSale';
import ModalPayOff from '../modals/ModalPayOff';

class AccountsList extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            open_modal: false,
            modal_type: "",
            sale_id: -1,
            total: 0,
            delivered: 0
        }
    }

    componentDidMount() {
        this.props.fetchAccounts();
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
    
    openModal(sale_id, type, account) { 
        this.setState({open_modal: true, modal_type: type, sale_id: sale_id, total: account.sale_total, delivered: account.delivered});
    }

    closeModal = () =>{
        this.setState({open_modal: false, modal_type: "", total: 0, delivered: 0});
    }

    printSale = () => {

    }

    render() {
        const {open_modal, modal_type, sale_id, total, delivered} = this.state;
        const MODAL_DETAIL = "MODAL_DETAIL";
        const MODAL_PAYOFF =  "MODAL_PAYOFF";
        return (
            <div>{
                !this.props.accounts ? <Spinner></Spinner>
                    :
                    <table id="my_datatable" className="display table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                    <th>Fecha</th>
                                    <th>Cliente</th>
                                    <th>Total</th>
                                    <th>Saldo</th>
                                    <th></th>
                            </tr>
                        </thead>
                        <tbody> {this.props.accounts.map((account) => (
                            <tr key={account.sale_id}>
                                <td>{account.sale_date}</td>
                                <td>{account.client_name}</td>
                                <td>{account.sale_total}</td>
                                <td>{-(Number(account.sale_total) - Number(account.delivered))}</td>
                                <td>
                                    <button className="btn-success btn" onClick={() => this.openModal(account.sale_id, MODAL_DETAIL, account)}><i className="fas fa-search-dollar"></i></button>
                                    <button className="btn-primary btn" onClick={() => alert("re imprimir ticket")}><i className="fas fa-print"></i></button>
                                    <button className="btn-warning btn" onClick={() => this.openModal(account.sale_id, MODAL_PAYOFF, account)}><i class="fas fa-hand-holding-usd"></i></button>
                                </td>
                            </tr>
                        ))
                        }
                        </tbody>
                    </table> 
                } 
                {
                    open_modal &&
                        modal_type === MODAL_DETAIL ? 
                            <ModalDetailSale 
                                closeModal={this.closeModal}
                                printSale={this.printSale}
                                sale_id={sale_id}
                                type="account"> 
                            </ModalDetailSale> 
                        : modal_type === MODAL_PAYOFF &&
                            <ModalPayOff sale_id={sale_id} closeModal={this.closeModal} total={total} delivered={delivered}></ModalPayOff>
                }
            </div>
        )
    }
}

export default connect((state) => ({accounts: state.order.order}), {
    fetchAccounts
})(AccountsList);