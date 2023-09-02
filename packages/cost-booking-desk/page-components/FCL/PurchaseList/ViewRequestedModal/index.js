import { Modal, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const ONE_OPTION = 1;

function ViewRequestModal({
	viewRequestModal = {},
	setViewRequestModal = () => {},
}) {
	const { details = {}, currency = 'INR', status = '' } = viewRequestModal;
	const { numberOfContainers, amountPerContainer } = details;

	const handleClick = () => {
		setViewRequestModal({});
	};

	return (
		<Modal
			show={!isEmpty(viewRequestModal)}
			onClose={() => setViewRequestModal({})}
		>
			<Modal.Header title="Request Advance Payment" />
			<Modal.Body>
				{status.toLowerCase() === 'approved'
					? <div className={styles.approved_request}>Approved: </div> : null}
				{status.toLowerCase() === 'rejected'
					? <div className={styles.rejected_request}>Reason For Rejection: </div> : null}

				<div className={styles.request_label_container}>
					<div className={styles.request_label_header}>
						<div className={styles.request_label}>Amount per container</div>
						<div className={styles.request_label}>Number of containers</div>
						<div className={styles.request_label}>Total Amount to be paid</div>
						<div className={styles.request_label}>Payment Mode</div>
						<div className={styles.request_label}>Remark</div>
					</div>
					<div>
						<div className={styles.request_value}>{`:  ${currency} ${amountPerContainer}`}</div>
						<div className={styles.request_value}>
							{`:  ${numberOfContainers} Container${numberOfContainers > ONE_OPTION ? 's' : ''}`}
						</div>
						<div className={styles.request_value}>
							{`:  ${currency} ${amountPerContainer * numberOfContainers}`}
						</div>
						<div className={styles.request_value}>{':  '}</div>
						<div className={styles.request_value}>{':  '}</div>
					</div>
				</div>
			</Modal.Body>
			{status.toLowerCase() === 'rejected'
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
