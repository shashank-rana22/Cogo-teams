import { Button, Pill } from '@cogoport/components';
import { useState } from 'react';

import ReOpenJob from './ReOpenJob';
import styles from './styles.module.css';

function JobStatus({ shipment_data = {}, job_open_request = false }) {
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

			{job_open_request ? (
				<Button
					className={styles.job_reopen_button}
					themeType="link"
					size="md"
					onClick={() => setShowModal(true)}
				>
					Re-open
				</Button>
			) : null}

			{showModal ? (
				<ReOpenJob shipmentData={shipment_data} showModal={showModal} setShowModal={setShowModal} />
			) : null}
		</div>
	);
}

export default JobStatus;
