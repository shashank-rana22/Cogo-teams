import { Button, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import List from './List';
import styles from './styles.module.css';

function UploadedInvoices({ invoices }) {
	const [showModal, setShowModal] = useState(false);
	return (
		<div>
			<div className={styles.line} />
			<div className={styles.main}>
				<List data={invoices} limit />
			</div>
			{invoices.length > 3 ? (
				<Button themeType="linkUi" className={styles.modal_button} onClick={() => setShowModal(true)}>
					View All uploaded invoices
				</Button>
			) : null}
			{showModal ? (
				<Modal
					show={showModal}
					onClose={() => setShowModal(false)}
					style={{ width: '1250px' }}
				>
					<Modal.Header title="All uploaded invoices" />

					<Modal.Body>
						<div className={styles.modal}>
							<List data={invoices} />
						</div>
					</Modal.Body>
				</Modal>
			) : null}
		</div>
	);
}
export default UploadedInvoices;
