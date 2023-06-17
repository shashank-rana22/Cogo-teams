import { Button, Modal } from '@cogoport/components';

import useDeleteDunningCycle from '../hooks/useDeleteDunningCycle';

import styles from './styles.module.css';
import FormLayout from '../CreateCycleForm/FormLayout';
import { useEffect, useState } from 'react';

function ActionModal({ actionModal, setActionModal, getDunningList }) {
    const [formData,setFormData] = useState({});

	const { rowData, action, visible } = actionModal || {};
	const { deleteCycle, loading } = useDeleteDunningCycle({ id: rowData?.id, getDunningList, setActionModal });
	const onClose = () => {
		setActionModal({});
	};

	useEffect(()=>{
      setFormData({...rowData,
	triggerTypeData:rowData?.triggerType,
	});
	},[rowData])


	return (
		<Modal size="xl" show={visible} onClose={onClose} placement="center" className={styles.modal_section}>
			{action === 'edit' && <Modal.Header title="Edit Cycle"/>}
			<Modal.Body>
				{action === 'delete' && (
					<>
						<div className={styles.header}>
							<h3>
								Are you sure you want to delete
{rowData?.name}
								?
							</h3>
						</div>
						<div className={styles.buttons}>
							<Button themeType="secondary" onClick={onClose}>Cancel</Button>
							<Button
								style={{ marginLeft: '12px' }}
								onClick={deleteCycle}
								disabled={loading}
							>
								Delete
							</Button>
						</div>
					</>
				)}

				{
				action === 'edit' && (
					<div>
						<FormLayout
						formData={{...formData}}
						setFormData={setFormData}
						isEditMode={true}
						/>
						
					</div>
				)
			}
			</Modal.Body>
			{action === 'edit' && <Modal.Footer>
			<div className={styles.button_update}>
							<Button
								style={{ marginLeft: '12px' }}
								// onClick={()=>{}}
								// disabled={loading}
							>
								Update
							</Button>
							<Button themeType="secondary" onClick={onClose}>Cancel</Button>
						</div>
				</Modal.Footer>}

		</Modal>
	);
}

export default ActionModal;
