import { Button, Modal } from '@cogoport/components';
import { IcCError } from '@cogoport/icons-react';

import styles from './styles.module.css';

function RestrictTask({
	task = {},
	restrict = false,
	setRestrictTask = () => {},
	onCancel = () => {},
	toastMessage = '',
}) {
	const handleClose = () => {
		setRestrictTask(false);
		onCancel();
	};

	let message = '';

	switch (task?.task) {
		case 'upload_draft_bill_of_lading':
			message = 'You are not auhtorized to do this task';
			break;

		case 'upload_bill_of_lading':
			message = toastMessage;
			break;
		default:
			message = '';
			break;
	}

	return (
		<Modal themeType="primary" size="md" show={restrict} onClose={handleClose}>
			<div className={styles.container}>
				<IcCError width={40} height={40} />

				<div className={styles.text}>{message}</div>

				<Button themeType="primary" size="md" onClick={handleClose}>
					Noted
				</Button>
			</div>
		</Modal>
	);
}

export default RestrictTask;
