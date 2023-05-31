import { Modal, Button } from '@cogoport/components';

import styles from './styles.module.css';

function AddCustomerInvoice({
	closeModal = () => {},
	setShow = () => {},
	show = false,
	handleRefetch = () => {},
	invoice = {},
	shipment_data = {},
}) {
	return (
		<section>
			<Modal
				show={show}
				showCloseIcon={false}
				closeOnOuterClick={false}
			>
				<Modal.Header title="AddCustomerInvoice" />
				<Modal.Body>
					AddCustomerInvoice
				</Modal.Body>
				<Modal.Footer className={styles.button_wrapper}>
					<Button onClick={() => setShow(false)} themeType="secondary"> Cancel</Button>
					<Button>Submit</Button>
				</Modal.Footer>
			</Modal>
		</section>
	);
}

export default AddCustomerInvoice;
