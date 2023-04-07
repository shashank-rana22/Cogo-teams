import { Button, Modal } from '@cogoport/components';
import { useState } from 'react';

import ReassignManager from '../../../page-components/EmployeeDirectory/TreeView/UserCard/EnlargedCard/ReassignManager';

import styles from './styles.module.css';

function ReassignManagerModal({ item, refetchList = () => {} }) {
	const [openReassign, setOpenReassign] = useState(false);

	const getTitleDiv = () => (
		<>
			<div className={styles.user}>
				{item.name}
			</div>
			<div className={styles.manager}>
				Currently Under :
				{' '}
				<span className={styles.manager_name}>{item.manager_name}</span>
			</div>
		</>
	);

	return (
		<>
			<Button size="sm" onClick={() => setOpenReassign(true)} themeType="secondary">Reassign</Button>

			{openReassign && (
				<Modal show={openReassign} onClose={() => setOpenReassign(false)}>
					<Modal.Header title={getTitleDiv()} />
					<Modal.Body>
						<ReassignManager
							userId={item.user_id}
							setOpenReassign={setOpenReassign}
							refetchTreeParams={refetchList}
						/>
					</Modal.Body>
				</Modal>
			)}
		</>
	);
}

export default ReassignManagerModal;
