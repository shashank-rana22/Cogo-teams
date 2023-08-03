import { Modal, Button, cl } from '@cogoport/components';
import React from 'react';

import useSendInvoiceEmail from '../../../../../../../../../hooks/useSendInvoiceEmail';

import styles from './styles.module.css';

function SendInvoiceEmail({
	show = false,
	onClose = () => {},
	invoice = {},
	refetch = () => {},
}) {
	const refetchAfterApiCall = () => {
		refetch();
		onClose();
	};
	const { handleSend = () => {}, loading } = useSendInvoiceEmail({
		refetch: refetchAfterApiCall,
	});

	return (
		<Modal show={show} onClose={onClose} closeOnOuterClick={false} showCloseIcon={!loading}>
			<Modal.Body className={styles.body}>
				<p className={cl`${styles.text} ${styles.bold}`}>Are you sure, you want to send invoice email?</p>

				<div className={styles.text}>You cannot undo this step so please do it carefully.</div>
			</Modal.Body>

			<Modal.Footer className={styles.button_div}>
				<Button
					themeType="secondary"
					onClick={onClose}
					disabled={loading}
				>
					Cancel
				</Button>

				<Button onClick={() => handleSend({ id: invoice?.id })} disabled={loading}>
					Send Email
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default SendInvoiceEmail;
