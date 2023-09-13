import { Button, Pill } from '@cogoport/components';
import { useState } from 'react';

import ReOpenJob from './ReOpenJob';
import styles from './styles.module.css';

const JOB_OPEN_ALLOWED_ROLES = [
	'superadmin',
	'admin',
	'booking_agent_manager',
	'costbooking_manager',
	'operation_manager',
];

function JobStatus({ shipment_data = {}, activeStakeholder = '' }) {
	const [showModal, setShowModal] = useState(false);

	if (shipment_data?.is_job_closed_financially) {
		return (
			<div className={styles.job_closed_container}>
				<Pill className={styles.job_closed_pill} size="lg">Financially Closed</Pill>
			</div>
		);
	}

	return (
		<div className={styles.job_closed_container}>
			<Pill className={styles.job_closed_pill} size="lg">Operationally Closed</Pill>

			{JOB_OPEN_ALLOWED_ROLES.includes(activeStakeholder) && (
				<Button
					className={styles.job_undo_button}
					themeType="link"
					size="md"
					onClick={() => setShowModal(true)}
				>
					Undo
				</Button>
			)}
			{showModal ? (
				<ReOpenJob shipmentData={shipment_data} showModal={showModal} setShowModal={setShowModal} />
			) : null}
		</div>
	);
}

export default JobStatus;
