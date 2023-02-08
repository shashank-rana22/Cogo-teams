import { Modal } from '@cogoport/components';
import { useSelector } from '@cogoport/store';

import MobileVerification from './MobileVerification';

function MobileNoVerificationModal({
	selectedUser = {},
	setSelectedUser = () => {},
	showMobileVerificationModal = false,
	setShowMobileVerificationModal = () => {},
}) {
	const {
		general: { isMobile = false },
	} = useSelector((state) => state);

	const handleCloseModal = () => {
		setSelectedUser(null);
		setShowMobileVerificationModal(false);
	};

	return (
		<Modal
			className="primary sm"
			show={showMobileVerificationModal}
			onClose={handleCloseModal}
			onOuterClick={handleCloseModal}
			width={isMobile ? 'auto' : 400}
			position={isMobile ? 'bottom' : ''}
		>
			<MobileVerification
				setSelectedUser={setSelectedUser}
				selectedUser={selectedUser}
				type={showMobileVerificationModal}
			/>
		</Modal>
	);
}

export default MobileNoVerificationModal;
