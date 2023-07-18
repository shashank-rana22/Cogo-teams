import { Modal, Select } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

function UpdateScheduleModal({ setUpdate, update }) {
	const status = [
		{ label: 'Serviceable', value: 'serviceable' },
		{ label: 'Unserviceable', value: 'unserviceable' },
	];

	const [statusValue, setStatusValue] = useState('serviceable');
	return (
		<Modal
			size="lg"
			show={update}
			onClose={() => setUpdate(null)}
			placement="center"
		>
			<Modal.Header title="Update Schedule" />
			<Modal.Body>
				<div className={styles.box}>
					<div className={styles.heading}>Status</div>
					<Select
						value={statusValue}
						onChange={setStatusValue}
						placeholder="Status"
						options={status}
					/>
				</div>
				<div className={styles.box}>
					<div className={styles.heading}>Schedules</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default UpdateScheduleModal;
