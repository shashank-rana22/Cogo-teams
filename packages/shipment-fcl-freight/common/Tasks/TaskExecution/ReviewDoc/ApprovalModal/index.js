import { Button, Modal } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function ApprovalModal({
	showModal = false,
	setShowModal = () => {},
	task = {},
	handleFinalApprove = () => {},
	taskUpdateLoading = false,
}) {
	return (
		<Modal
			show={showModal}
			size="md"
			placement="center"
			onClose={() => setShowModal(!!taskUpdateLoading)}
			className={styles.modal_container}
		>
			<Modal.Header title="Confirmation" />
			<Modal.Body>
				{`Are you sure you want to ${startCase(task?.task)}?`}
			</Modal.Body>

			<Modal.Footer>
				<Button
					themeType="secondary"
					onClick={() => setShowModal(false)}
					disabled={taskUpdateLoading}
				>
					No
				</Button>

				<Button
					themeType="primary"
					onClick={() => handleFinalApprove()}
					loading={taskUpdateLoading}
					disabled={taskUpdateLoading}
				>
					Yes, approve
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ApprovalModal;
