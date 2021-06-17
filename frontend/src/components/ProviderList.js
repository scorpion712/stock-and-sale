import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import Spinner from './Spinner'
import {connect} from 'react-redux'
import {fetchProviders, deleteProvider} from '../actions/providerActions'
import $ from 'jquery'

//Datatable Modules 
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import { ProviderIncreaseModal } from '../modals/ProviderIncreaseModal' 
import {ProviderEditModal} from '../modals/ProviderEditModal'


class ProviderList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open_modal: false 
        }
    }

    componentDidMount(){
        this.props.fetchProviders();
        //initialize datatable
        $(document).ready(function (e) { 
            $('#my_datatable').DataTable( { 
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

    openModal(provider, option) {
        switch (option) {
            case 1:
                this.setState({open_modal: true, prov: provider});
                break;
            case 2:
                this.setState({open_modal_increase: true, prov: provider});
                break;
            default: break;
        } 
    }

    closeModal = () => {
        this.setState({open_modal: false, prov: null, open_modal_increase: false});
    }
 

    render() {
        const {open_modal, prov, open_modal_increase} = this.state;
        return (
            <div className="row product-list">
                <Fade bottom cascade>
                    <div className="col-md-12">
                        {!this.props.providers ? <tr><Spinner></Spinner></tr> :
                            <table id="my_datatable" className="display table table-striped table-bordered">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Proveedor</th>
                                        <th>Dirección</th>
                                        <th>Ciudad</th>
                                        <th>Teléfono</th>
                                        <th>Email</th>
                                        <th>CUIT</th>
                                        <th>Cód.Postal</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody> {this.props.providers.map((provider) => (
                                    <tr key={provider.provider_id}>
                                        <td>{provider.provider_name}</td>
                                        <td>{provider.provider_address}</td>
                                        <td>{provider.provider_city}</td>
                                        <td>{provider.provider_phone}</td>
                                        <td>{provider.provider_email}</td>
                                        <td>{provider.provider_cuit}</td>
                                        <td>{provider.provider_postal}</td>
                                        <td className="myclase">
                                            <button className="btn btn-primary btn-xs pull-left" onClick={() => this.openModal(provider,1)}>
                                                    <i className="fas fa-pencil-alt" aria-hidden="true"></i> 
                                            </button>
                                            <button className="btn btn-danger btn-xs pull-left" onClick={() => this.props.deleteProvider(provider.provider_id)}>
                                                    <i className="fas fa-trash-alt" aria-hidden="true"></i> 
                                            </button> 
                                            <button className="btn btn-success btn-xs pull-left" onClick={() => this.openModal(provider,2)}>
                                                <i className="fas fa-chart-line"></i> 
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
                        <ProviderEditModal closeModal={this.closeModal} modal_title={"Editar Proveedor"} prov={prov}></ProviderEditModal>
                }
                {
                    open_modal_increase && 
                     <ProviderIncreaseModal closeModal={this.closeModal} modal_title={"Aumento porcentaje " + prov.provider_name} prov_id={prov.provider_id}></ProviderIncreaseModal>
                }
            </div>
        )
    }
}
export default connect ((state) => ({providers: state.providers.providers}), {
    fetchProviders, 
    deleteProvider
})(ProviderList);
  