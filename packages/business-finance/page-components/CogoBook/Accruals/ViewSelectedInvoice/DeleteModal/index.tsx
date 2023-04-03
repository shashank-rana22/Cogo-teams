import { Modal, Button } from '@cogoport/components';

import styles from './styles.module.css';

interface DeleteInterface {
	openDeleteModal?: object
	handleCloseModal?: () => void
	setOpenDeleteModal?: React.Dispatch<React.SetStateAction<{}>>
	deleteSelected?: Function
	id?: string
}
function DeleteModal({
	openDeleteModal, handleCloseModal, setOpenDeleteModal, deleteSelected,
	id:idData,
}:DeleteInterface) {
	return (
		<Modal show={openDeleteModal[idData]} onClose={handleCloseModal}>
			<Modal.Body>
				<div
					className={styles.flex_modal}
				>
					<div style={{ margin: '20px' }}>Are you sure you want to delete this?</div>

					<div className={styles.flex}>
						<Button
							id="cancel-modal-btn"
							style={{ marginRight: 10 }}
							themeType="secondary"
							onClick={() => { setOpenDeleteModal(false); }}
						>
							Cancel
						</Button>
						<Button
							id="approve-modal-btn"
							themeType="primary"
							onClick={() => { deleteSelected({ id: idData, handleCloseModal }); }}
						>
							Yes
						</Button>
					</div>
				</div>
			</Modal.Body>

		</Modal>
	);
}
export default DeleteModal;
