import { Modal, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import getRequestAdvanceDocumentData from '../../../../helpers/getRequestAdvanceDocumentData';

import styles from './styles.module.css';

function ViewRequestModal({
	viewRequestModal = {},
	setViewRequestModal = () => {},
}) {
	const { status = '' } = viewRequestModal || {};
	const requestAdvanceDocumentData = getRequestAdvanceDocumentData({ viewRequestModal });

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

				{requestAdvanceDocumentData.map((itm) => {
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
