import { Button, Modal } from '@cogoport/components';
import { useState } from 'react';

import ReassignManager from '../../ReassignManager';

import styles from './styles.module.css';
import TitleDiv from './TitleDiv';

function ReassignManagerModal({ item = {}, refetchList = () => {} }) {
	const [openReassign, setOpenReassign] = useState(false);

	return (
		<>
			<Button size="sm" onClick={() => setOpenReassign(true)} themeType="secondary">Reassign</Button>

			{openReassign && (
				<Modal show={openReassign} onClose={() => setOpenReassign(false)}>
					<Modal.Header title={<TitleDiv item={item} styles={styles} />} />
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
