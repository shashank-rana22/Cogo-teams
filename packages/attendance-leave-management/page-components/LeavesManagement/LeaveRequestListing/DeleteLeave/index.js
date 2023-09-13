import { Modal, Button } from '@cogoport/components';

import useDeleteLeave from '../../../../hooks/useDeleteLeave';

import styles from './styles.module.css';

function DeleteLeave({
	show = false, onClose = () => {}, refetch = () => {},
	refetchList = () => {}, selectedData = {},
}) {
	const { deleteLeave, loading } = useDeleteLeave({ onClose, refetch, refetchList });

	const handleDeleteLeave = () => {
		deleteLeave(selectedData.id);
	};

	return (
		<Modal size="md" show={show} onClose={onClose} placement="top">
			<Modal.Header title="Delete Leave" />
			<Modal.Body>
				<h2 className={styles.main_text}>Are you sure you wish to delete the leave?</h2>
			</Modal.Body>
			<Modal.Footer>
				<Button themeType="secondary" disabled={loading} className={styles.cancel_btn} onClick={onClose}>
					Cancel
				</Button>
				<Button onClick={handleDeleteLeave} disabled={loading}>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default DeleteLeave;
