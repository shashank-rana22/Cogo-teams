import { Button } from '@cogoport/components';
import { RPASearch } from '@cogoport/ocean-modules';

import styles from './styles.module.css';

const disabledStakeholders = ['release_desk', 'collection_desk'];

const rpaSupportedTasks = [
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
	shipment_type,
	show = false,
}) {
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

	const disableTask = disabledStakeholders.includes(task?.assigned_stakeholder);

	if (
		rpaSupportedTasks.includes(task?.task)
		&& (task?.task !== 'upload_si' || shipment_type === 'fcl_freight')
	) {
		return (
			<div className={styles.container}>
				<RPASearch
					onManualUpload={() => handleClick(task)}
					multiple
					entity_type={task?.task}
					onUpload={handleChange}
				>
					<Button className={styles.upload_button}>
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
