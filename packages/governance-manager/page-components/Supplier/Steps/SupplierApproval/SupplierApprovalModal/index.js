import { Modal, Button, Textarea } from '@cogoport/components';

import styles from './styles.module.css';

function SupplierApprovalModal({ open, setOpen, setVerify }) {
	const onClose = () => {
		setOpen(0);
	};
	const handleVerify = () => {
		setVerify((verify) => {
			const newVerify = [...verify];

			newVerify[open - 1] = true;
			return newVerify;
		});
		onClose();
	};
	const handleReject = () => {
		setVerify((verify) => {
			const newVerify = [...verify];

			newVerify[open - 1] = false;
			return newVerify;
		});
		onClose();
	};
	return (
		<div style={{ padding: '20px' }}>

			<Modal size="md" show={open} onClose={() => { onClose(); }} placement="centre">
				<Modal.Header title="Supplier Approval" className={styles.header} />
				<div className={styles.header} />
				<Modal.Body className={styles.body}>
					<div className={styles.text_middle}>Need Analysis Report</div>
					<Textarea
						name="a4"
						size="md"
						defaultValue=""
						placeholder=""
						rows={4}
						style={{ height: '75%', marginBottom: '34px' }}
					/>
				</Modal.Body>
				<Modal.Footer style={{ gap: '15px' }}>
					<Button onClick={handleVerify} style={{ backgroundColor: '#ABCD62' }}>Verify</Button>
					<Button onClick={handleReject}>Reject</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default SupplierApprovalModal;
