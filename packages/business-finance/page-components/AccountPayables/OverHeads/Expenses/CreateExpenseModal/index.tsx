import React from "react";
import { Modal, Button } from "@cogoport/components";


function CreateExpenseModal ({
    setShowModal, 
    showModal = false
}){

    return (
        <Modal size="md" show={showModal} onClose={() =>  setShowModal(false)} placement="center">
            <Modal.Header title="Are you sure?" />
            <Modal.Body>
                et consectetur adipisicing elit. Quis, assumenda. Hic ipsam doloremque assumenda et soluta expedita
                consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas. Pariatur eaque aut sunt?
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis, assumenda. Hic ipsam doloremque assumenda 
                et soluta expedita consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas. 
                Pariatur eaque aut sunt?
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() =>  setShowModal(false)}>OK</Button>
            </Modal.Footer>
	</Modal>
    )
}

export default CreateExpenseModal;