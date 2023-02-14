import { Modal, Button } from '@cogoport/components';
import { useSelector } from '@cogoport/store';

import MobileVerification from './MobileVerification';
import useMobileNoVerification from './MobileVerification/useMobileNoVerification';

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

	const {
		controls = [],
		onSubmit = () => {},
		showEnterOtpComponent = false,
		otpNumber = '',
		setOtpNumber = () => {},
		sendOtpNumber = () => {},
		verifyOtpNumber = () => {},
		actualControl,
		handleSubmit = () => {},
		loading = false,
	} = useMobileNoVerification({ selectedUser, type: showMobileVerificationModal });

	return (
		<Modal
			className="primary sm"
			show={showMobileVerificationModal}
			onClose={handleCloseModal}
			onOuterClick={handleCloseModal}
			width={isMobile ? 'auto' : 400}
			position={isMobile ? 'bottom' : ''}
		>
			<Modal.Header title="Mobile Number Verification" />
			<Modal.Body>
				{' '}
				<MobileVerification
					controls={controls}
					setOtpNumber={setOtpNumber}
					sendOtpNumber={sendOtpNumber}
					actualControl={actualControl}
					handleSubmit={handleSubmit}
					onSubmit={onSubmit}
					showEnterOtpComponent={showEnterOtpComponent}
				/>

			</Modal.Body>
			<Modal.Footer>
				{!showEnterOtpComponent && (
					<Button
						type="submit"
						size="lg"
						onClick={handleSubmit(onSubmit)}
						disabled={loading}
					>
						Get OTP
					</Button>
				)}

				{showEnterOtpComponent && (
					// eslint-disable-next-line jsx-a11y/no-static-element-interactions
					<Button
						type="submit"
						size="lg"
						onClick={verifyOtpNumber}
						disabled={loading || otpNumber?.length !== 4}
					>
						Submit
					</Button>
				)}
			</Modal.Footer>

		</Modal>
	);
}

export default MobileNoVerificationModal;
