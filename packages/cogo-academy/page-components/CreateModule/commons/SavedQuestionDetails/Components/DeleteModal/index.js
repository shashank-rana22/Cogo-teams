import { Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function DeleteModal({
	questionToDelete,
	setQuestionToDelete,
	handleDeleteQuestion,
}) {
	return (
		<Modal
			size="sm"
			show={!isEmpty(questionToDelete)}
			onClose={() => setQuestionToDelete({})}
			placement="center"
			showCloseIcon={false}
		>
			<Modal.Header title="Are you sure you want to delete this?" />

			<Modal.Body>
				<div className={styles.btn_container}>
					<Button
						type="button"
						themeType="secondary"
						onClick={() => setQuestionToDelete({})}
					>
						Cancel
					</Button>

					<Button
						type="button"
						style={{ marginLeft: '8px' }}
						onClick={() => { handleDeleteQuestion({ item: questionToDelete }); }}
					>
						Delete
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default DeleteModal;
