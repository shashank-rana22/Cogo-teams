import { Button, Modal } from '@cogoport/components';

import styles from './styles.module.css';

interface Props {
	showConfirmationModal?: boolean;
	masterListId?: string;
	deleteMasterLoading?: boolean;
	setShowConfirmationModal?: React.Dispatch<React.SetStateAction<boolean>>;
	deleteMasterException?: Function;
}
function ConfirmationModal({
	showConfirmationModal,
	setShowConfirmationModal,
	deleteMasterException,
	deleteMasterLoading,
	masterListId,
}:Props) {
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
