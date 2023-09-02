import { Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function ViewRefundModal({
	viewRefundModal = {},
	setViewRefundModal = () => {},
}) {
	return (
		<Modal
			show={!isEmpty(viewRefundModal)}
			onClose={() => setViewRefundModal({})}
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
