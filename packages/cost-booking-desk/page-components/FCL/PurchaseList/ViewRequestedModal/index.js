import { Modal, Button } from '@cogoport/components';

import styles from './styles.module.css';

function ViewRequestModal({
	viewRequestModal = false,
	setViewRequestModal = () => {},
	status = 'requested',
}) {
	const handleClick = () => {
		setViewRequestModal(false);
	};

	return (
		<Modal
			show={viewRequestModal}
			onClose={() => setViewRequestModal(false)}
		>
			<Modal.Header title="Request Advance Payment" />
			<Modal.Body>
				{status === 'approved' ? <div className={styles.approved_request}>Approved: Reason...</div> : null}
				{status === 'rejected'
					? <div className={styles.rejected_request}>Reason For Rejection: Reason...</div> : null}
				<div className={styles.request_label_container}>
					<div className={styles.request_label}>Amount per container:</div>
					<div className={styles.request_label}>Number of containers:</div>
					<div className={styles.request_label}>Total Amount to be paid:</div>
					<div className={styles.request_label}>Payment Mode:</div>
					<div className={styles.request_label}>Remark:</div>
				</div>
			</Modal.Body>
			{status === 'rejected'
				? (
					<Modal.Footer>
						<Button onClick={handleClick}>Send Request Again</Button>
					</Modal.Footer>
				)
				: null}
		</Modal>
	);
}
export default ViewRequestModal;
