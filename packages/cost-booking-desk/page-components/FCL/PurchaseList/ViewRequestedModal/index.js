import { Modal, cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import getRequestAdvanceDocumentData from '../../../../helpers/getRequestAdvanceDocumentData';

import styles from './styles.module.css';

function ViewRequestModal({
	viewRequestModal = {},
	setViewRequestModal = () => {},
}) {
	const { status = '' } = viewRequestModal || {};
	const requestAdvanceDocumentData = getRequestAdvanceDocumentData({ viewRequestModal });

	return (
		<Modal
			show={!isEmpty(viewRequestModal?.data)}
			onClose={() => setViewRequestModal({})}
		>
			<Modal.Header title="Request Advance Payment" />
			<Modal.Body>
				{status?.toLowerCase() === 'approved'
					? <div className={cl`${styles.approved_request} ${styles.request}`}>Approved </div> : null}
				{status?.toLowerCase() === 'rejected'
					? (
						<div className={cl`${styles.rejected_request} ${styles.request}`}>
							Rejected
						</div>
					) : null}

				{(requestAdvanceDocumentData || []).map((itm) => {
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
export default ViewRequestModal;
