import { Modal, Button } from '@cogoport/components';

import styles from '../styles.module.css';

function ConfirmModal({ confirmDelete, setConfirmDelete, activeHawb, loading, deleteHAWB }) {
	return (
		<Modal
			size="md"
			show={confirmDelete}
			onClose={() => setConfirmDelete(false)}
			scroll={false}
		>
			<Modal.Header title={(<h4 style={{ textAlign: 'center' }}>Confirm Delete</h4>)} />
			<Modal.Body>
				<div className={styles.sure_approve}>
					Are you sure you want to delete
					{' '}
					<span>{activeHawb?.documentNo || 'this'}</span>
					{' '}
					HAWB
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					style={{ marginRight: '10px', border: '1px solid #333' }}
					size="md"
					disabled={loading}
					onClick={() => setConfirmDelete(false)}
					themeType="secondary"
				>
					Cancel
				</Button>
				<Button
					size="md"
					themeType="accent"
					disabled={loading}
					onClick={deleteHAWB}
				>
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ConfirmModal;
