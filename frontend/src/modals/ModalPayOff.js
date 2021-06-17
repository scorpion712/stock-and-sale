import React from 'react'
import Modal from 'react-bootstrap/Modal'    
import PayOff from '../components/PayOff';
import {ModalHeader} from '../modals/ModalHeader'

const ModalPayOff = (props) => {
    const {closeModal, sale_id, total, delivered} = props; 
    return (
        <Modal show={true} onHide={closeModal}>
            <ModalHeader modal_title={"Saldar Cuenta"} closeModal={closeModal}></ModalHeader>
            <PayOff sale_id={sale_id} closeModal={closeModal} total={total} delivered={delivered}></PayOff>
        </Modal>
    ) 
}

export default ModalPayOff;