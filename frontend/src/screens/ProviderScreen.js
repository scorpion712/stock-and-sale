import React, { Component } from 'react'
import SideMenu from '../components/SideMenu'
import Fade from 'react-reveal/Fade'
import ProviderList from '../components/ProviderList' 
import ProviderCreateModal from '../modals/ProviderCreateModal';
 

export default class ProviderScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            open_modal: false
        }
    }

    openModal() { 
        this.setState({open_modal: true}); 
    }

    closeModal = () => {
        this.setState({open_modal: false});
    }
    
    render() {
        const {open_modal} = this.state;
        return (
            <div className="content row">
                <SideMenu></SideMenu> 
                <div className="col-md-10 product">
                    <Fade>
                        <h2>Proveedores</h2>
                        <hr></hr> 
                        <button className="btn btn-success btn-provider" onClick={() => this.openModal()}>Nuevo Proveedor</button>
                        <br></br>
                        <ProviderList></ProviderList>
                    </Fade>
                </div>  
                {
                    open_modal && 
                        <ProviderCreateModal modal_title={"Nuevo Proveedor"} closeModal={this.closeModal}></ProviderCreateModal>
                } 
            </div>
    )}
}
