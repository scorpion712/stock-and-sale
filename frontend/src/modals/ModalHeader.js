

export const ModalHeader = (props) => {
    return (
        <div className="modal-header">
            <h5 className="modal-title">{props.modal_title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.closeModal}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}