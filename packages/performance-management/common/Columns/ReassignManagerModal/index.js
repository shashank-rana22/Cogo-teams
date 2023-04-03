import { Button, Modal } from '@cogoport/components';
import { useState } from 'react';

import ReassignManager from '../../../page-components/EmployeeDirectory/TreeView/UserCard/EnlargedCard/ReassignManager';

function ReassignManagerModal({ item, refetchList = () => {} }) {
	const [openReassign, setOpenReassign] = useState(false);

	return (
		<div>
			<Button size="sm" onClick={() => setOpenReassign(true)} themeType="secondary">Reassign</Button>

			{openReassign && (
				<Modal show={openReassign} onClose={() => setOpenReassign(false)}>
					<Modal.Header title={`Reassign Manager of : ${item.name}`} />
					<Modal.Body>
						<ReassignManager
							userId={item.user_id}
							setOpenReassign={setOpenReassign}
							refetchTreeParams={refetchList}
						/>
					</Modal.Body>
				</Modal>
			)}
		</div>
	);
}

export default ReassignManagerModal;
