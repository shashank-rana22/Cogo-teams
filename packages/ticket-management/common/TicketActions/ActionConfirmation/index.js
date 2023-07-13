import { Modal, Button } from '@cogoport/components';

import styles from './styles.module.css';

function ActionConfirmation({
	id = '', show = false, actionType = '', onSubmit = () => {},
	setConfirmationConfig = () => {},
}) {
	const onClose = () => setConfirmationConfig({ show: false, actionType: '' });

	return (
		<Modal size="sm" show={show} onClose={onClose} placement="center">
			<Modal.Body>
				<div className={styles.modal_body}>
					{`Are your sure want to ${actionType} Ticket #${id}?`}
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button className={styles.cancel_button} themeType="secondary" onClick={onClose}>Cancel</Button>
				<Button onClick={onSubmit}>Submit</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ActionConfirmation;
