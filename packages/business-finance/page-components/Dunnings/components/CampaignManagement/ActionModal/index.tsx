import { Button, Modal } from "@cogoport/components";
import styles from './styles.module.css'
import useDeleteDunningCycle from "../hooks/useDeleteDunningCycle";

function ActionModal({actionModal,setActionModal,getDunningList}){
	const {deleteCycle, loading} = useDeleteDunningCycle({id:actionModal?.id,getDunningList,setActionModal})
    const onClose=()=>{
        setActionModal({...actionModal,visible:false})
    }
    return <>
    <Modal size="md" show={actionModal?.visible} onClose={onClose} placement="center" showCloseIcon={true}>
		<Modal.Body>
			<div className={styles.header}>
				<h3>Are you sure you want to delete this cycle ?</h3>
				
			</div>
			<div className={styles.buttons}>
				<Button themeType="secondary" onClick={onClose}>Cancel</Button>
				<Button 
				style={{marginLeft:'12px'}}
				onClick={()=>deleteCycle()}
				disabled={loading}
				>
					Delete
					</Button>
			</div>
		</Modal.Body>
		
	</Modal>
    </>
}

export default ActionModal;