import { Button, Modal } from '@cogoport/components';

import styles from './styles.module.css';

function ConfirmationModal({
	showConfirmationModal,
	setShowConfirmationModal,
	deleteMasterException,
	deleteMasterLoading,
	masterListId,
}) {
	return (
		<Modal
			size="sm"
			show={showConfirmationModal}
			onClose={() => setShowConfirmationModal(false)}
			scroll={false}
		>
			<Modal.Body>
				<div className={styles.sure_approve}>
					Are you sure want to Delete?
				</div>
			</Modal.Body>
			<div className={styles.button}>
				<Button
					size="md"
					themeType="secondary"
					disabled={deleteMasterLoading}
					onClick={() => setShowConfirmationModal(false)}
					style={{ marginRight: '10px' }}
				>
					Cancel
				</Button>
				<Button
					size="md"
					themeType="primary"
					disabled={deleteMasterLoading}
					onClick={() => {
						deleteMasterException(
							masterListId,
							'DELETE',
						);
					}}
				>
					Delete
				</Button>
			</div>
		</Modal>
	);
}

export default ConfirmationModal;
