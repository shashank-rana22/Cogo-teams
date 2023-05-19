import { Modal, Button, cl } from '@cogoport/components';
import React from 'react';

import useSendInvoiceEmail from '../../../../../../../../hooks/useSendInvoiceEmail';

import styles from './styles.module.css';

function SendInvoiceEmail({
	show = false,
	setShow = () => {},
	invoice = {},
	refetch = () => {},
}) {
	const { handleSend, loading } = useSendInvoiceEmail({
		setShow,
		invoice,
		refetch,
	});

	return (
		<Modal show={show} onClose={() => setShow(false)}>
			<Modal.Body className={styles.body}>
				<div className={cl`${styles.text} ${styles.bold}`}>Are you sure, you want to send invoice email?</div>
				<div className={styles.text}>You cannot undo this step so please do it carefully.</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					themeType="tertiary"
					onClick={() => setShow(false)}
					disabled={loading}
					style={{ marginRight: '20px' }}
				>
					Cancel
				</Button>

				<Button onClick={handleSend} disabled={loading}>
					Send Email
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default SendInvoiceEmail;
