import React,{useState} from "react";
import { Modal, Button } from "@cogoport/components";


function CreateExpenseModal ({
    setShowModal, 
    showModal = false,
    createExpenseType=""
}){
   const [timeline, setTimeline] = useState(['expenseDetails','uploadInvoice','finalConfirmation']);
     const [active, setActive] = useState('expenseDetails');
     
     const handleClick =()=>{

     }

    return (
        <Modal size="xl" show={showModal} onClose={() =>  setShowModal(false)} placement="top">
            <Modal.Header title={`CREATE EXPENSE - ${createExpenseType}`}/>
            <Modal.Body>
                 <div>
                    timeline
                 </div>

            </Modal.Body>
            <Modal.Footer>
               {active!=='expenseDetails' && <Button >Back</Button>}
                <Button onClick={handleClick}>Save & Next</Button>
            </Modal.Footer>
	</Modal>
    )
}

export default CreateExpenseModal;