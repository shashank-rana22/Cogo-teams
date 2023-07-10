import { Modal, Button } from '@cogoport/components';
import OTPInput from '@cogoport/forms/page-components/Business/OTPInput';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { useState } from 'react';

import getViewTypeMapping from '../../constants/index';
import useGetActivity from '../../hooks/useGetActivity';
import useGetGenerateOtp from '../../hooks/useGetGenerateOtp';
import useGetSubmitOtp from '../../hooks/useGetSubmitOtp';

import styles from './styles.module.css';

const MAX_LIMIT = 600;
const OTP_LENGTH = 6;
function LockScreen({ agentId, userRoleIds, firestore }) {
	const { ROLE_IDS_CHECK } = getViewTypeMapping();
	const [manualOtp, setManualOtp] = useState(true);

	const { showModal, setShowModal, isLockedEnabled } = useGetActivity({
		firestore,
		agentId,
	});
	const { apiTrigger, loading, otpNumber, setOtpNumber } = useGetSubmitOtp({ agentId, firestore, setShowModal });
	const { generateOtp } = useGetGenerateOtp({ agentId, firestore, setShowModal, setManualOtp });

	const isRolePresent = userRoleIds.some((itm) => ROLE_IDS_CHECK.kam_view.includes(itm));

	const showLockScreen = showModal && isRolePresent && isLockedEnabled;
	return (
		<Modal
			scroll={false}
			size="sm"
			show={showLockScreen}
			closeOnOuterClick={false}
			showCloseIcon={false}
			className={styles.styled_modal}
		>
			<Modal.Body className={styles.styled_modal_body}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.cogoport_admin_logo}
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
			</Modal.Body>
		</Modal>
	);
}

export default LockScreen;
