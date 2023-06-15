import { Button, Modal, Table } from "@cogoport/components";
import styles from './styles.module.css'
import { getColumns } from "../helpers/column";

const ViewScheduleModal = ({show,setShow,columnsForPattern}) =>{

    return (
        <Modal size="md" show={show} onClose={()=>setShow(null)} placement="center">
        <Modal.Header title="Ocean Port Pair Schedule" />
        <Modal.Body>
            {
                columnsForPattern && show && (
                <Table columns={columnsForPattern} data={show?.patterns}/>
                )
            }
        </Modal.Body>
        </Modal>
    )
}

export default ViewScheduleModal;