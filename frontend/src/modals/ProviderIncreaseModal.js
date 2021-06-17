import React from 'react'
import { ModalHeader } from './ModalHeader'
import Modal from 'react-bootstrap/Modal' 
import ProviderIncrease from '../components/ProviderIncrease';

export const ProviderIncreaseModal = (props) => { 

    const {modal_title, closeModal, prov_id} = props;

    return (    
        <div>
            <Modal show={true} onHide={closeModal} keyboard >  
                <ModalHeader modal_title={modal_title} closeModal={closeModal}></ModalHeader> 
                <ProviderIncrease closeModal={closeModal} prov_id={prov_id}></ProviderIncrease> 
            </Modal>
        </div>
    );
}