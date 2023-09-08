import { Button, Pill } from '@cogoport/components';

import styles from './styles.module.css';

// todo anmol: update these according to roles
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

function JobStatus({ shipment_data = {}, activeStakeholder = '', setReOpenJobModal = () => {} }) {
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
					onClick={() => setReOpenJobModal(true)}
				>
					Undo
				</Button>
			)}
		</div>
	);
}

export default JobStatus;
