import { Modal } from '@cogoport/components';

import WhatsappVerification from './WhatsappVerification';

function WhatsappNoVerificationModal({
	source = '',
	selectedUser = {},
	showWhatsappVerificationModal = false,
	setShowWhatsappVerificationModal = () => {},
	handleWhatsappVerification = () => {},
	refetchUsers,
	source_id = '',
}) {
	const handleCloseModal = () => {
		setShowWhatsappVerificationModal(false);
	};

	return (
		<Modal
			show={showWhatsappVerificationModal}
			onClose={handleCloseModal}
			onOuterClick={handleCloseModal}
			width={400}
			size="sm"
		>
			<Modal.Header title="Whatsapp Number Verification" style={{ padding: '16px 24px' }} />

			<WhatsappVerification
				selectedUser={selectedUser}
				type={showWhatsappVerificationModal}
				handleWhatsappVerification={handleWhatsappVerification}
				source={source}
				refetchUsers={refetchUsers}
				source_id={source_id}
			/>
		</Modal>
	);
}

export default WhatsappNoVerificationModal;
