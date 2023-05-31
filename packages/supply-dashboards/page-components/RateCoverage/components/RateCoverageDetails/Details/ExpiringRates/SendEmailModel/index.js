import { Button, Modal } from '@cogoport/components';

import styles from './styles.module.css';

function SendEmailModel({ show, setShow }) {
	const onClose = () => {
		setShow(false);
	};
	return (
		<Modal size="md" show={show} onClose={onClose} placement="center">
			<Modal.Header title="Send Email to LSP’s" />
			<Modal.Body>
				<div className={styles.parent}>
					<div>
						You have chosen to extend the expiry of
						{' '}
						<span style={{ color: '#F37166' }}>5 rates.</span>
						<br />
						Are you sure you want to send an email to LSP’s
						regarding the extension of rate validity.
						<br />
						<br />
						<div style={{ color: '#EE3425' }}>
							* Please Note: Once you send the email you can’t
							unsend it.

						</div>
					</div>

				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button themeType="tertiary" onClick={onClose} style={{ marginRight: '10px' }}>Cancel</Button>
				<Button themeType="accent" onClick={onClose}>Confirm</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default SendEmailModel;
