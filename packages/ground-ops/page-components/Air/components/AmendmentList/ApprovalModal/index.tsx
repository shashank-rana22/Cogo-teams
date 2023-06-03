import { Button, Modal } from '@cogoport/components';

import styles from './styles.module.css';

function ApprovalModal({ showApprove, setShowApprove, handleUpdate, updateLoading }) {
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
					Did you get confirmation from your KAM to provide approval?
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
					Approve

				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ApprovalModal;
