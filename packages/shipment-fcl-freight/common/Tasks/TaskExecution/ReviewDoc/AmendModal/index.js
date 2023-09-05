import { Button, Modal } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function AmendModal({
	showModal = false,
	setShowModal = () => {},
	handleFinalSubmit = () => {},
	remarkValue = '',
	document_type = '',
}) {
	return (
		<Modal
			show={showModal}
			size="md"
			placement="center"
			onClose={() => setShowModal(false)}
			className={styles.modal_container}
		>
			<Modal.Header title="Confirmation" />
			<Modal.Body>
				{`Are you sure you want to Amend ${startCase(document_type)} with the remark: ${remarkValue}?`}
			</Modal.Body>

			<Modal.Footer>
				<Button themeType="secondary" onClick={() => setShowModal(false)}>
					No
				</Button>

				<Button themeType="primary" onClick={handleFinalSubmit}>
					Yes, amend
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AmendModal;
