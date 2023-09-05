import { Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import getRefundAdvanceDocumentData from '../../../../helpers/getRefundAdvanceDocumentData';

import styles from './styles.module.css';

function ViewRefundModal({
	viewRefundModal = {},
	setViewRefundModal = () => {},
}) {
	const refundAdvanceDocumentData = getRefundAdvanceDocumentData({ viewRefundModal });
	return (
		<Modal
			show={!isEmpty(viewRefundModal?.data)}
			onClose={() => setViewRefundModal({})}
		>
			<Modal.Header title="Refund Details" />
			<Modal.Body>
				{(refundAdvanceDocumentData || []).map((itm) => {
					const { title, value } = itm || {};
					return (
						<div key={title} className={styles.flex}>
							<div className={styles.title}>{title}</div>
							<div className={styles.divider}>:</div>
							<div className={styles.name}><div>{value || ''}</div></div>
						</div>
					);
				})}
			</Modal.Body>
		</Modal>
	);
}
export default ViewRefundModal;
