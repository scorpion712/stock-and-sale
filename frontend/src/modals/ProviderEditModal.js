import React from 'react' 
import Modal from 'react-bootstrap/Modal' 

import { ModalHeader } from './ModalHeader'
import EditProvider from '../components/EditProvider';
 
export const ProviderEditModal = (props) => { 
        const {closeModal, prov, modal_title} = props;
        return (
            <Modal show={true} onHide={closeModal} >  
                <ModalHeader modal_title={modal_title} closeModal={closeModal}></ModalHeader>
                <EditProvider closeModal={closeModal} prov={prov}></EditProvider>
            </Modal>
        ) 
}
