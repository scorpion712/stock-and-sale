import React from 'react'
import { ModalHeader } from './ModalHeader'
import Modal from 'react-bootstrap/Modal' 
import ProviderCreate from '../components/ProviderCreate'

const ProviderCreateModal = (props) => {  
    const {modal_title, closeModal} = props; 
    return (
        <div>
            <Modal show={true} onHide={closeModal} keyboard >  
                <ModalHeader modal_title={modal_title} closeModal={closeModal}></ModalHeader> 
                <ProviderCreate closeModal={closeModal}></ProviderCreate> 
            </Modal>
        </div> 
    )
    
} 

export default ProviderCreateModal;