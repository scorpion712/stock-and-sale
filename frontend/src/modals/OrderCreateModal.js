import React from 'react'
import Modal from 'react-bootstrap/Modal'  
import CreateOrder from '../components/CreateOrder';
import {ModalHeader} from '../modals/ModalHeader'

const OrderCreateModal = (props) => {
    const {closeModal, client, cartItems, saveOrder, resetClient} = props;
    return (
        <Modal show={true} onHide={closeModal}>
            <ModalHeader modal_title={"Finalizar Venta"} closeModal={closeModal}></ModalHeader>
            <CreateOrder closeModal={closeModal} client={client} cartItems={cartItems} saveOrder={saveOrder} resetClient={resetClient}></CreateOrder>
        </Modal>
    )
}

export default OrderCreateModal;
