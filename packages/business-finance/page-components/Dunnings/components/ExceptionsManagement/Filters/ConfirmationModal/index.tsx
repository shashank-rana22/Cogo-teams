import { Button, Modal } from '@cogoport/components';

import styles from './styles.module.css';

function ConfirmationModal({ showApprove, setShowApprove, handleUpdate, updateLoading }) {
	return (
		<Modal
			size="md"
			show={showApprove}
			onClose={() => setShowApprove(false)}
			scroll={false}
		>
			<Modal.Header title={(<h4 style={{ textAlign: 'center' }}>Approval Remark</h4>)} />
			<Modal.Body>
				<div className={styles.sure_approve}>
					Are you sure want to delete?
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					style={{ marginRight: '10px', border: '1px solid #333' }}
					size="md"
					disabled={updateLoading}
					onClick={() => setShowApprove(false)}
					themeType="secondary"
				>
					Cancel
				</Button>
				<Button
					size="md"
					themeType="accent"
					disabled={updateLoading}
					onClick={() => handleUpdate(showApprove)}
				>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ConfirmationModal;
