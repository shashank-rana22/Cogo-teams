import { Modal, Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';
import useSendInvoiceEmail from '../../../../../../Hooks/useSendInvoiceEmail';

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
			<Modal.Header title="Send Invoice Email" />
			<Modal.Body><div className={styles.Text}>Are you sure, you want to send invoice email?</div></Modal.Body>
			<Modal.Footer>
				<Button
					className="secondary"
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
