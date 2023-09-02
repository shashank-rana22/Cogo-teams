import { Modal } from '@cogoport/components';

import styles from './styles.module.css';

function ViewRefundModal({
	viewRefundModal = false,
	setViewRefundModal = () => {},
}) {
	return (
		<Modal
			show={viewRefundModal}
			onClose={() => setViewRefundModal(false)}
		>
			<Modal.Header title="Refund Details" />
			<Modal.Body>
				<div className={styles.refund_label_container}>
					<div className={styles.refund_label}>Amount:</div>
					<div className={styles.refund_label}>Date:</div>
					<div className={styles.refund_label}>UTR Number:</div>
					<div className={styles.refund_label}>Proof:</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}
export default ViewRefundModal;
