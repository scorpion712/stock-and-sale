import React, { Component } from 'react'
import ProductList from '../components/ProductList'
import SideMenu from '../components/SideMenu'
import Modal from 'react-bootstrap/Modal'  
import ArticleCreate from '../modals/ArticleCreate';
import Fade from 'react-reveal/Fade'

const ModalHeader = (props) => {
    return (
        <div class="modal-header">
            <h5 class="modal-title">NUEVO ARTÍCULO</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.closeModal}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}

export default class ProductScreen extends Component {
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
 
    render () {
        const {open_modal} = this.state; 
        return ( 
            <div className="content row">
                <SideMenu></SideMenu> 
                <div className="col-md-10 product">
                    <Fade>
                        <h2>Artículos</h2>
                        <hr></hr>
                        <button className="btn btn-success" onClick={() => {this.openModal()}}>Nuevo Artículo</button>
                    </Fade>
                    <ProductList></ProductList>
                </div>   {
                    open_modal &&   
                        <Modal show={true} onHide={this.closeModal} >  
                            <ModalHeader closeModal={this.closeModal}></ModalHeader>
                            <ArticleCreate closeModal={this.closeModal}></ArticleCreate> 
                        </Modal>
                }
            </div>  
        )
    }
}
 

    