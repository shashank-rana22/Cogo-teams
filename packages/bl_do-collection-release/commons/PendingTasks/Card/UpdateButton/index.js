import { Button } from '@cogoport/components';
import { RPASearch } from '@cogoport/ocean-modules';

import styles from './styles.module.css';

const rpaSupportedTasks = [
	'upload_bill_of_lading',
];

const DISABLE_TASKS = ['knockoff_invoices', 'knockoff_bl_invoices', 'knockoff_do_invoices'];

function UpdateButton({
	task = {},
	handleClick = () => {},
	handleChange = () => {},
	hideButton = false,
	show = false,
}) {
	if (hideButton) {
		return null;
	}

	let buttonText = 'Update';

	if (task?.task_type === 'upload_document') {
		buttonText = 'Upload';
	}

	if (rpaSupportedTasks.includes(task?.task)) {
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
				disabled={DISABLE_TASKS.includes(task.task)}
				onClick={() => handleClick(task)}
			>
				{buttonText}
			</Button>
		</div>
	);
}

export default UpdateButton;
