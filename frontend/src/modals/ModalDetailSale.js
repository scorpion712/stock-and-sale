import React from 'react'
import Modal from 'react-bootstrap/Modal'   
import DetailOrder from '../components/DetailOrder';
import {ModalHeader} from '../modals/ModalHeader'

const ModalDetailSale = (props) => {
    const {closeModal, sale_id, type} = props; 
    return (
        <Modal show={true} onHide={closeModal}>
            <ModalHeader modal_title={"Detalle Venta"} closeModal={closeModal}></ModalHeader>
            <DetailOrder closeModal={closeModal} 
                        sale_id={sale_id}
                        type={type} >
            </DetailOrder>
        </Modal>
    ) 
}

export default ModalDetailSale;