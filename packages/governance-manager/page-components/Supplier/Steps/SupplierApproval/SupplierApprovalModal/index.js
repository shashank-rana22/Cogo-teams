import { Modal, Button } from '@cogoport/components';

function SupplierApprovalModal({ open, setOpen, verify, setVerify, index }) {
	const onClose = () => {
		setOpen(false);
	};
	const handleVerify = () => {
		setVerify((verify) => {
			const newVerify = [...verify];

			newVerify[index] = true;
			return newVerify;
		});
		onClose();
	};
	const handleReject = () => {
		setVerify((verify) => {
			const newVerify = [...verify];

			newVerify[index] = false;
			return newVerify;
		});
		onClose();
	};
	return (
		<div style={{ padding: '20px' }}>

			<Modal size="md" show={open} onClose={() => { onClose(); }} placement="centre">
				<Modal.Header title="Are you sure?" />
				<Modal.Body>
					e
				</Modal.Body>
				<Modal.Footer style={{ gap: '10px' }}>
					<Button onClick={handleVerify}>Verify</Button>
					<Button onClick={handleReject}>Reject</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default SupplierApprovalModal;
