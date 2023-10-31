import { Modal, Button } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import React, { useState } from 'react';

import useUpdateSMTRateJob from '../../../../hooks/useUpdateSMTRateJob';

import styles from './styles.module.css';

function UpdateSMTUser({
	updateUser = false, setUpdateUser = () => {}, filter = {}, getListCoverage = () => {},
	data = {},
}) {
	const [assignData, setAssignData] = useState('');
	const { service } = filter;
	const { id } = data || {};

	const {
		updateRateJob = () => {},
		loading = false,
	} = useUpdateSMTRateJob({ service, setUpdateUser, getListCoverage });

	const handelSubmit = async () => {
		await updateRateJob({ assignData, id });
	};

	return (
		<Modal size="md" show={updateUser} onClose={setUpdateUser} placement="top">
			<Modal.Header title="ReAssign Task To New User ?" />
			<div className={styles.body}>
				<Modal.Body>
					<AsyncSelect
						value={assignData}
						placeholder="Select user"
						asyncKey="list_chat_agents"
						initialCall
						size="md"
						style={{ width: '250px' }}
						params={{
							filters: {
								common_agent_type : 'supply',
								status            : 'active',
							},
							sort_by: 'agent_type',
						}}
						onChange={(val) => setAssignData(val)}
					/>
				</Modal.Body>
			</div>

			<div className={styles.footer}>
				<Button
					size="md"
					onClick={() => setUpdateUser(false)}
					themeType="secondary"
					style={{ marginRight: '10px' }}
				>
					Close
				</Button>
				<Button size="md" onClick={handelSubmit} disabled={loading}>Re-Assign</Button>
			</div>
		</Modal>
	);
}

export default UpdateSMTUser;
