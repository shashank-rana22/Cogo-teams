import { Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { RPASearch } from '@cogoport/ocean-modules';
import { useContext } from 'react';

import styles from './styles.module.css';

const DISABLE_TASK_FOR_STAKEHOLDERS = ['release_desk', 'collection_desk'];

const RPA_SUPPORTED_TASKS = [
	'upload_booking_note',
	'update_container_details',
	'upload_draft_bill_of_lading',
	'upload_bill_of_lading',
	'upload_si',
];

function UpdateButton({
	task = {},
	handleClick = () => {},
	handleChange = () => {},
	hideButton = false,
	show = false,
	tasksList = [],
}) {
	const { primary_service } = useContext(ShipmentDetailContext);

	if (hideButton) {
		return null;
	}

	let buttonText = 'Update';

	if (task?.task_type?.includes('approve_quote')) {
		buttonText = 'Approve Quote';
	}

	if (task?.task_type?.includes('amend_quote')) {
		buttonText = 'Amend Quote';
	}

	if (task?.task_type === 'upload_document') {
		buttonText = 'Upload';
	}

	if (task?.task_type === 'approve_document') {
		buttonText = 'Review';
	}

	let disableTask = DISABLE_TASK_FOR_STAKEHOLDERS.includes(task?.assigned_stakeholder);

	if (task.task === 'upload_si'
	&& task.status === 'pending'
	&& primary_service?.trade_type === 'export') {
		disableTask = (tasksList || []).some(
			(item) => item.service_type === 'fcl_freight_service'
				&& item.status === 'pending'
				&& item.task === 'update_container_details',
		);
	}

	if (task.task === 'update_pre_alert_shared_with_igm_at' && task.status === 'pending') {
		disableTask = (tasksList || []).some(
			(item) => item.service_type === 'fcl_freight_service'
				&& item.status === 'pending'
				&& item.task === 'upload_bill_of_lading',
		);
	}

	if (task.task === 'upload_draft_bill_of_lading' && task.status === 'pending') {
		disableTask = (tasksList || []).some(
			(item) => item.service_type === 'fcl_freight_service'
				&& item.status === 'pending'
				&& item.task === 'upload_draft_bill_of_lading',
		);
	}

	if (
		RPA_SUPPORTED_TASKS.includes(task.task)
		&& (task.task !== 'upload_si')
	) {
		return (
			<div className={styles.container}>
				<RPASearch
					onManualUpload={() => handleClick(task)}
					multiple
					entity_type={task?.task}
					onUpload={handleChange}
				>
					<Button className={styles.upload_button} disabled={disableTask}>
						{!show ? buttonText : 'Close'}
					</Button>
				</RPASearch>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<Button
				className={styles.upload_button}
				onClick={() => handleClick(task)}
				disabled={disableTask}
			>
				{buttonText}
			</Button>
		</div>
	);
}

export default UpdateButton;
