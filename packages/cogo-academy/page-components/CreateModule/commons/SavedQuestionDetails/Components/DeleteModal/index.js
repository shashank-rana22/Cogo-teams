import { Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function DeleteModal({ showModal, setShowModal, handleDeleteQuestion }) {
	return (
		<Modal
			size="sm"
			show={!isEmpty(showModal)}
			onClose={() => setShowModal({})}
			placement="center"
			showCloseIcon={false}
		>
			<Modal.Header title="Are you sure you want to delete this?" />

			<Modal.Body>
				<div className={styles.btn_container}>
					<Button
						type="button"
						themeType="secondary"
						onClick={() => setShowModal({})}
					>
						Cancel
					</Button>

					<Button
						type="button"
						style={{ marginLeft: '8px' }}
						onClick={() => {
							handleDeleteQuestion({ item: showModal });
							setShowModal({});
						}}
					>
						Delete
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default DeleteModal;
