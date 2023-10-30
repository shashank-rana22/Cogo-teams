import { Modal, Input, Button } from '@cogoport/components';

import useAddEmail from '../../../../hooks/useAddEmail';

function AddModal({
	showModal = false, setShowModal = () => {},
	setEmail = () => {},
	email = '',
	addEmailRefetch = () => {},
	emailType = '',
}) {
	const { addEmail, addEmailLoading } = useAddEmail({
		refetch: addEmailRefetch,
		emailType,
	});

	return showModal
		? (
			<Modal
				placement="top"
				show={showModal}
				onClose={() => { setShowModal(false); }}
			>
				<Modal.Header title="Add New Email" />
				<Modal.Body
					style={{ minHeight: 200 }}
				>
					<Input
						size="sm"
						placeholder="Enter a valid Email"
						value={email}
						onChange={setEmail}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button
						style={{ fontWeight: 700 }}
						disabled={addEmailLoading}
						onClick={() => {
							addEmail(email);
							setShowModal(false);
						}}
					>
						SUBMIT
					</Button>
				</Modal.Footer>
			</Modal>
		)
		: null;
}

export default AddModal;
