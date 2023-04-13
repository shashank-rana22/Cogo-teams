import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function UpdateButton({ task = {}, handleClick = () => {}, hideButton = false }) {
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

	return (
		<div className={styles.container}>
			<Button className={styles.upload_button} onClick={() => handleClick(task)}>
				{buttonText}
			</Button>
		</div>
	);
}

export default UpdateButton;
