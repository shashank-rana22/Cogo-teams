import { Modal } from '@cogoport/components';
import React from 'react';

import Form from './Form';
import styles from './styles.module.css';

function RequestCN({
	show = false,
	setShow = () => {},
	shipment_serial_id = '',
	invoice = {},
	refetchCN = () => {},
	invoiceData = {},
}) {
	return (
		<Modal show={show} onClose={() => setShow(false)} className="primary xl">
			<Modal.Header title="REQUEST CREDIT NOTE" />
			<Modal.Body>
				<div className={styles.Div} style={{ fontSize: 14 }}>
					<div className={styles.BoldText}>
						SID
						{' '}
						{shipment_serial_id}
						{' '}
						- Invoice number -
						{' '}
						<div className={styles.UnderLinedText}>{invoice?.live_invoice_number}</div>
					</div>
				</div>

			</Modal.Body>

			<Form
				shipment_serial_id={shipment_serial_id}
				invoice={invoice}
				setShow={setShow}
				refetchCN={refetchCN}
				invoiceData={invoiceData}
			/>
		</Modal>
	);
}

export default RequestCN;
