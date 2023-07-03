import { Modal, Button } from '@cogoport/components';
import OTPInput from '@cogoport/forms/page-components/Business/OTPInput';
import { Image } from '@cogoport/next';
import { useState } from 'react';

import useGetGenerateOtp from '../../hooks/useGetGenerateOtp';
import useGetSubmitOtp from '../../hooks/useGetSubmitOtp';

import styles from './styles.module.css';

const MAX_LIMIT = 300;
const OTP_LENGTH = 6;
function LockScreen({ agentId, firestore, setShowModal }) {
	const [manualOtp, setManualOtp] = useState(true);
	const { apiTrigger, loading, otpNumber, setOtpNumber } = useGetSubmitOtp({ agentId, firestore, setShowModal });
	const { generateOtp } = useGetGenerateOtp({ agentId, firestore, setShowModal, setManualOtp });

	return (
		<Modal
			scroll={false}
			size="fullscreen"
			show
			closeOnOuterClick={false}
			showCloseIcon={false}
		>
			<Modal.Body className={styles.styled_modal_body}>
				<div className={styles.styled_otp_box}>
					<Image
						src="https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/cogoport-admin.svg"
						alt="Logo Cogoport"
						width={160}
						height={100}
					/>
					<div className={styles.styled_text}>
						Session logged out. Please provide the OTP sent to your registered mail.
					</div>
					<div className={styles.styled_view}>
						<div className={styles.styled_div}>
							<OTPInput
								otpLength={OTP_LENGTH}
								setOtpValue={setOtpNumber}
								loading={false}
								resendOtpTimerDuration={MAX_LIMIT}
								sendOtp={(obj) => generateOtp({ ...obj })}
								placeholder=""
								manualOtpRequest={manualOtp}
							/>
						</div>
						<div className={styles.button_div}>
							<Button
								size="md"
								themeType="primary"
								onClick={apiTrigger}
								disabled={otpNumber?.length < OTP_LENGTH}
								loading={loading}
							>
								Submit
							</Button>
						</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default LockScreen;
