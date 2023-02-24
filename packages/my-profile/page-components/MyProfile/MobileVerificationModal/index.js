import { Modal, Button } from '@cogoport/components';
import { useSelector } from '@cogoport/store';

import MobileVerification from './MobileVerification';

function MobileNoVerificationModal({
	selectedUser = {},
	showMobileVerificationModal = false,
	setShowMobileVerificationModal = () => {},
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
}) {
	const {
		general: { isMobile = false },
	} = useSelector((state) => state);

	const handleCloseModal = () => {
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
					selectedUser={selectedUser}
					loading={loading}
				/>

			</Modal.Body>
			<Modal.Footer>
				{!showEnterOtpComponent && (
					<Button
						type="submit"
						size="lg"
						disabled={loading}
						onClick={handleSubmit(onSubmit)}
					>
						Get OTP
					</Button>
				)}

				{showEnterOtpComponent && (
				// eslint-disable-next-line jsx-a11y/no-static-element-interactions
					<Button
						type="submit"
						className="primary sm"
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
