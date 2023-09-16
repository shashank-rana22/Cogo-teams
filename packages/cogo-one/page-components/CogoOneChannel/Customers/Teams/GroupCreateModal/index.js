import {
	Modal,
	// Button
} from '@cogoport/components';

function GroupCreateModal() {
	return (
		<Modal size="md" placement="bottom">
			<Modal.Header title="Are you sure?" />
			<Modal.Body>
				et consectetur adipisicing elit. Quis, assumenda. Hic ipsam doloremque assumenda et soluta expedita
				consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas. Pariatur eaque aut sunt?
				Lorem ipsum, dolor sit amet consectetur adipisicing elit.
				Quis, assumenda. Hic ipsam doloremque assumenda
				et soluta expedita consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas.
				Pariatur eaque aut sunt?
			</Modal.Body>
			<Modal.Footer>
				{/* <Button onClick={onClose}>OK</Button> */}
			</Modal.Footer>
		</Modal>
	);
}

export default GroupCreateModal;
