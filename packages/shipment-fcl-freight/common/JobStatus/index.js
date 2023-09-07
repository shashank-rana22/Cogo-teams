import { Button, Pill } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import styles from './styles.module.css';

const JOB_OPEN_ALLOWED_ROLES = [
	'superadmin',
	'admin',
	// kam managers
	'booking_agent_manager',
	// so2 managers
	'document_desk_manager',
	'costbooking_manager',
	'lastmile_ops_manager',
	'so1_so2_ops',
];

function JobStatus({ activeStakeholder = '', setReOpenJobModal = () => {} }) {
	const { shipment_data = {} } = useContext(ShipmentDetailContext);

	if (!shipment_data?.is_job_closed) {
		return null;
	}

	return (
		<div className={styles.job_closed_container}>
			{shipment_data?.is_job_closed_financially ? (
				<Pill className={styles.job_closed_pill} size="lg">Financially Closed</Pill>
			) : (
				<>
					<Pill className={styles.job_closed_pill} size="lg">Operationally Closed</Pill>
					{JOB_OPEN_ALLOWED_ROLES.includes(activeStakeholder) && (
						<Button
							className={styles.job_undo_button}
							themeType="link"
							size="md"
							onClick={() => setReOpenJobModal(true)}
						>
							Undo
						</Button>
					)}
				</>
			)}
		</div>
	);
}

export default JobStatus;
