import { Modal, Button } from '@cogoport/components';
import React from 'react';

// import Form from './Form';
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
		<Modal show={show} onClose={() => setShow(false)} size="xl">
			<Modal.Header title="REQUEST CREDIT NOTE" />
			<Modal.Body>
				<div className={styles.div}>
					<div className={styles.bold_text}>
						SID
						&nbsp;
						{shipment_serial_id}
						&nbsp;
						- Invoice number -
						&nbsp;
						<div className={styles.underLined_text}>{invoice?.live_invoice_number}</div>
					</div>
				</div>
				<Form
					shipment_serial_id={shipment_serial_id}
					invoice={invoice}
					setShow={setShow}
					refetchCN={refetchCN}
					invoiceData={invoiceData}
				/>

			</Modal.Body>
			<Modal.Footer>
				<div className={styles.button_wrap}>
					<Button themeType="secondary">Cancel </Button>
					<Button
						type="button"
					>
						Request
					</Button>
				</div>
			</Modal.Footer>

		</Modal>
	);
}

export default RequestCN;
