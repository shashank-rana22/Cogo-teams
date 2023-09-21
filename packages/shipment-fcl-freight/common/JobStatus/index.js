import { Button, Pill, Tooltip, Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useCheckIncidentStatus from '../../hooks/useCheckIncidentStatus';

import ReOpenJob from './ReOpenJob';
import styles from './styles.module.css';

function JobStatus({ shipment_data = {} }) {
	const [showModal, setShowModal] = useState(false);

	const defaultParams = {
		jobNumber    : shipment_data?.serial_id,
		shipmentType : (shipment_data?.shipment_type)?.toUpperCase(),
	};

	const {
		incidentStatusData = {},
		incidentStatusLoading = false,
		incidentStatusRefetch = () => { },
	} = useCheckIncidentStatus({ defaultParams });

	const isNotIncident = isEmpty(incidentStatusData);

	if (shipment_data?.is_job_closed_financially) {
		return (
			<div className={styles.job_closed_container}>
				<Pill className={styles.job_closed_pill} size="lg">Financially Closed</Pill>
			</div>
		);
	}

	if (incidentStatusLoading) {
		return (
			<div className={styles.job_closed_container}>
				<Placeholder width="200px" height="16px" />
			</div>
		);
	}

	return (
		<div className={styles.job_closed_container}>
			{!isNotIncident ? (
				<Tooltip
					content={`Incident ID: ${incidentStatusData?.incidentId || '--'}`}
					placement="bottom"
					interactive
					disabled={!incidentStatusData?.incidentId}
				>
					<Pill className={styles.tooltip}>Job Open Requested</Pill>
				</Tooltip>
			) : null}

			<Pill className={styles.job_closed_pill} size="lg">Operationally Closed</Pill>

			{isNotIncident ? (
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
				<ReOpenJob
					shipmentData={shipment_data}
					showModal={showModal}
					setShowModal={setShowModal}
					incidentStatusRefetch={incidentStatusRefetch}
				/>
			) : null}
		</div>
	);
}

export default JobStatus;
