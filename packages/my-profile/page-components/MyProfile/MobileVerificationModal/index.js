import { Modal, Button } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { useTranslation } from 'next-i18next';

import MobileVerification from './MobileVerification';

const WIDTH = 400;

const OTP_LENGTH = 4;

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
	const { t } = useTranslation(['profile']);

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
			width={isMobile ? 'auto' : WIDTH}
			position={isMobile ? 'bottom' : ''}
		>
			<Modal.Header title={t('profile:mobile_number_verification')} />

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
						{t('profile:get_otp_button')}
					</Button>
				)}

				{showEnterOtpComponent && (
				// eslint-disable-next-line jsx-a11y/no-static-element-interactions
					<Button
						type="submit"
						className="primary sm"
						onClick={verifyOtpNumber}
						disabled={loading || otpNumber?.length !== OTP_LENGTH}
					>
						{t('profile:submit_button')}
					</Button>
				)}
			</Modal.Footer>

		</Modal>
	);
}

export default MobileNoVerificationModal;
