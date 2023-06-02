import { Button, Modal } from '@cogoport/components';

function FillCustomerPortalData(props) {
	const { show = false, closeModal } = props;
	return (
		<Modal
			show={show}
			closeOnOuterClick
			showCloseIcon

		>
			<Modal.Header title="Fill Customer Portal Data" />
			<Modal.Body>
				FillCustomerPortalData
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={closeModal}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default FillCustomerPortalData;
