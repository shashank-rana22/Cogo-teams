import { Button, Modal } from "@cogoport/components";
import styles from './styles.module.css'
import useDeleteDunningCycle from "../hooks/useDeleteDunningCycle";

function ActionModal({actionModal,setActionModal,getDunningList}){
	const {rowData, action, visible} = actionModal || {};
	const {deleteCycle, loading} = useDeleteDunningCycle({id:rowData?.id,getDunningList,setActionModal})
    const onClose=()=>{
        setActionModal({});
    }
    return <>
    <Modal size="md" show={visible} onClose={onClose} placement="center" >
		<Modal.Body>
			{action==='delete' && <>
			<div className={styles.header}>
				<h3>Are you sure you want to delete {rowData?.name}?</h3>
			</div>
			<div className={styles.buttons}>
				<Button themeType="secondary" onClick={onClose}>Cancel</Button>
				<Button 
				style={{marginLeft:'12px'}}
				onClick={deleteCycle}
				disabled={loading}
				>
					Delete
					</Button>
			</div>
			</>}

			{
				action === 'edit' && <div>
					<h3>Edit here</h3>
				</div>
			}
		</Modal.Body>
		
	</Modal>
    </>
}

export default ActionModal;