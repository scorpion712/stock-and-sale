import React, { Component } from 'react'
import SideMenu from '../components/SideMenu'
import {connect} from 'react-redux'
import {fetchClients, editClient, removeClient} from '../actions/clientActions'
import Spinner from '../components/Spinner'
import Fade from 'react-reveal/Fade' 
import Modal from 'react-bootstrap/Modal'  
import {ModalHeader} from '../modals/ModalHeader'
import $ from 'jquery' 

//Datatable Modules 
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

class ClientScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            c: null,
            client_name:"",
            client_address: "",
            client_phone: "", 
            client_cuit: "",
            client_category: "",
            client_email: "",   
            client_city: "",
            client_postal: ""
        }
    }

    componentDidMount() {
        this.props.fetchClients();
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
            })
        }); 
    }

    openModal(client) { 
        this.setState({openModal:true, c: client})
    }

    closeModal = () => {
        this.setState({openModal: false});
    }

    handleInput = (e) => { 
        this.setState({[e.target.name]: e.target.value})
    }

    editClient = (e) => {
        e.preventDefault(); 
        let {c} = this.state;  
        c.client_name = this.state.client_name || c.client_name;
        c.client_address = this.state.client_address || c.client_address;
        c.client_phone = this.state.client_phone || c.client_phone;
        c.client_cuit = this.state.client_cuit || c.client_cuit;
        c.client_category = this.state.client_category || c.client_category;
        c.client_email = this.state.client_email || c.client_email;  
        c.client_city = this.state.client_city || c.client_city;
        c.client_postal = this.state.client_postal || c.client_postal; 
        this.props.editClient(c); 
        this.closeModal();
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

    render() {
        const {openModal, c} = this.state;
        return (
            <div className="content row">
                <SideMenu></SideMenu> 
                <div className="col-md-10 product">
                    <Fade>
                        <h2>Clientes</h2>
                        <hr></hr> 
                    </Fade>
                    <Fade bottom cascade>
                    <div className="col-md-12">    
                {
                    !this.props.clients ? <tr> <Spinner></Spinner>  </tr>
                                    :  
                                <table id="my_datatable" className="display table table-striped table-bordered"  >  
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>Cliente</th>
                                            <th>Direccion</th>
                                            <th>Telefono</th>
                                            <th>CUIT</th>
                                            <th>CATEGORIA</th>
                                            <th>EMAIL</th>
                                            <th>CIUDAD</th>
                                            <th>CODPOST</th>
                                        <th></th>
                                        </tr>
                                    </thead>
                                    <tbody> {this.props.clients.map((client) => (
                                            <tr key={client.client_id} className="product-row">
                                                <td>{client.client_name}</td>
                                                <td>{client.client_address}</td>
                                                <td>{client.client_phone}</td>  
                                                <td>{client.client_cuit}</td>
                                                <td>{client.client_category}</td>
                                                <td>{client.client_email}</td>  
                                                <td>{client.client_city}</td>
                                                <td>{client.client_postal}</td>
                                                <td className="myclase">
                                                    <button title="Editar Cliente" className="btn btn-primary btn-xs pull-left" onClick={() => this.openModal(client)}>
                                                            <i class="fas fa-pencil-alt" aria-hidden="true"></i> 
                                                    </button>
                                                    <button title="Eliminar Cliente" className="btn btn-danger btn-xs pull-left" onClick={() => this.props.removeClient(client.client_id)}>
                                                            <i class="fas fa-trash-alt" aria-hidden="true"></i> 
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
                {
                    openModal && 
                        <Modal show={true} onHide={this.closeModal} keyboard > 
                            <ModalHeader closeModal={this.closeModal} title="Editar Cliente"></ModalHeader>    
                            <div class="modal-body" > 
                                <form onSubmit={this.editClient}>
                                    Nombre y Apellido
                                    <input type="text" name="client_name" defaultValue={c.client_name} className="form-control" onChange={this.handleInput}/>
                                    Direccion
                                    <input type="text" name="client_address" defaultValue={c.client_address} className="form-control" onChange={this.handleInput}/>
                                    Teléfono
                                    <input type="text" pattern="[0-9]{0,13}" defaultValue={c.client_phone} name="client_phone" className="form-control" onChange={this.handleInput}/>
                                    CUIT
                                    <input type="text" pattern="[0-9]{0,13}" defaultValue={c.client_cuit} name="client_cuit" className="form-control" onChange={this.handleInput}/>
                                    Categoria
                                    <input type="text" name="client_category" defaultValue={c.client_category} className="form-control" onChange={this.handleInput}/>
                                    Email
                                    <input type="email" name="client_email" defaultValue={c.client_email} className="form-control" onChange={this.handleInput}/>
                                    Ciudad
                                    <input type="text" name="client_city" defaultValue={c.client_city} className="form-control" onChange={this.handleInput}/>
                                    Cod. Postal
                                    <input type="text" pattern="[0-9]{0,13}" defaultValue={c.client_postal} name="client_postal" className="form-control" onChange={this.handleInput}/>
                                    <br></br> 
                                    <div className="my-modal-button">
                                        <button type="submit" className="btn btn-primary btn-lg pull-left">Guardar</button>
                                        <button className="btn btn-danger btn-lg pull-right" onClick={this.closeModal}>Cancelar</button>
                                    </div>  
                                </form> 
                            </div> 
                        </Modal>
                }
            </div> 
    )}
}
 
export default connect((state) => ({clients: state.client.clients}), {
    fetchClients,
    editClient,
    removeClient
})(ClientScreen); 