import { Button, Modal } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function AmendModal({
	showModal = false,
	setShowModal = () => {},
	handleFinalSubmit = () => {},
	remarkValue = '',
	document_type = '',
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
				{`Are you sure you want to Amend ${startCase(document_type)} with the remark: ${remarkValue}?`}
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
					onClick={() => handleFinalSubmit()}
					loading={taskUpdateLoading}
					disabled={taskUpdateLoading}
				>
					Yes, amend
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AmendModal;
