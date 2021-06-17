import React from 'react'
import EditProduct from '../components/EditProduct';

const ModalEditProduct = (props) => {
    const {p, closeModal} = props;
    return (
        <EditProduct p={p} closeModal={closeModal}></EditProduct>
    );
}

export default ModalEditProduct;