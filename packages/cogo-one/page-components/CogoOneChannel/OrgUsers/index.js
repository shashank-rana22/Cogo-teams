import { Modal } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { useState } from 'react';

import OrgUsersList from './OrgUserList';
import styles from './styles.module.css';

function OrgUsers({
	openKamContacts = false,
	setOpenKamContacts = () => {},
	setActiveTab = () => {},
}) {
	const [orgId, setOrgId] = useState('');

	return (
		<Modal show={openKamContacts} onClose={() => setOpenKamContacts(false)} placement="center">
			<Modal.Header title="Organizaton Users" />
			<Modal.Body className={styles.body_styles}>
				<AsyncSelect
					asyncKey="organizations"
					initialCall
					onChange={setOrgId}
					value={orgId}
					placeholder="Search by serial id / business name"
					size="md"
					isClearable
				/>
				<div className={styles.org_users_styles}>
					<OrgUsersList
						orgId={orgId}
						setActiveTab={setActiveTab}
						setOpenKamContacts={setOpenKamContacts}
						setOrgId={setOrgId}
					/>
				</div>
			</Modal.Body>
		</Modal>
	);
}
export default OrgUsers;
