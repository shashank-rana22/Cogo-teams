import Modal from '@cogoport/front/components/admin/Modal';
import Button from '@cogoport/front/components/admin/Button';
import { ButtonContainer, Header, Content } from './styles';

const ConfirmationModal = ({
	confirmationApproval,
	setConfirmationApproval,
	updateDocument,
	loading,
}) => {
	const handleClick = async () => {
		await updateDocument('document_accepted');
		setConfirmationApproval(false);
	};

	return (
		<Modal
			show={confirmationApproval}
			onClose={() => setConfirmationApproval(false)}
			onOuterClick={() => setConfirmationApproval(false)}
		>
			<Header>Approval Confirmation</Header>
			<Content>Are you sure you want to approve?</Content>
			<ButtonContainer>
				<Button
					className="secondary md cancel_button"
					disabled={loading}
					onClick={() => setConfirmationApproval(false)}
				>
					Cancel
				</Button>
				<Button disabled={loading} onClick={() => handleClick()}>
					Approve
				</Button>
			</ButtonContainer>
		</Modal>
	);
};
export default ConfirmationModal;
