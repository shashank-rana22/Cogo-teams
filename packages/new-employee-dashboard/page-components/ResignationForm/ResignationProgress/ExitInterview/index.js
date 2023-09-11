import { Button } from '@cogoport/components';
import { IcMProfile, IcMEmail, IcMCalendar, IcMClock, IcMLocation } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useSubmitResignationProgress from '../useSubmitResignationProgress';

import OTPInputExitInterview from './OTPInputExitInterview';
import styles from './styles.module.css';

const EMAIL_FOR_INTERVIEW_DETAILS = 'shivamsingh@cogoport.com';
const OTP_LENGTH = 6;
function ExitInterview({ data = {} }) {
	const INTERVIEW_DETAILS = {
		date     : '23/03/2023',
		time     : '2:15pm',
		location : 'Deck House',
		name     : 'Shivam Singh',
		email    : EMAIL_FOR_INTERVIEW_DETAILS,
	};
	const [otpValue, setOtpValue] = useState('');
	const [otpError, setOtpError] = useState(false);
	const { handleSubmit, onSubmit } = useSubmitResignationProgress({
		onSuccess: () => {
			console.log('api hit success...');
			// setShowModal(true);
		},
	});
	const onClickSubmit = () => {
		if (otpValue.length !== OTP_LENGTH) {
			setOtpError(true);
			return;
		}

		handleSubmit(onSubmit)();

		console.log('resign progress data ::', data);
	};

	return (
		<div className={styles.main_container}>

			<div className={styles.interview_details_container}>

				<div className={styles.interview_details_heading}>
					Exit Interview Details
				</div>
				<div className={styles.icon_and_info_container_main}>
					<div className={styles.icon_and_info_container}>
						<IcMCalendar height="18px" width="18px" fill="#4f4f4f" style={{ marginRight: 4 }} />
						<div className={styles.info}>
							{INTERVIEW_DETAILS.date}
						</div>
					</div>

					<div className={styles.icon_and_info_container}>
						<IcMClock height="18px" width="18px" fill="#4f4f4f" style={{ marginRight: 4 }} />
						<div className={styles.info}>
							{INTERVIEW_DETAILS.time}
						</div>
					</div>

					<div className={styles.icon_and_info_container}>
						<IcMLocation height="18px" width="18px" fill="#4f4f4f" style={{ marginRight: 4 }} />
						<div className={styles.info}>
							{INTERVIEW_DETAILS.location}
						</div>
					</div>

					<div className={styles.icon_and_info_container}>
						<IcMProfile height="18px" width="18px" fill="#4f4f4f" style={{ marginRight: 4 }} />
						<div className={styles.info}>
							{INTERVIEW_DETAILS.name}
						</div>
					</div>

					<div className={styles.icon_and_info_container}>
						<IcMEmail height="18px" width="18px" fill="#4f4f4f" style={{ marginRight: 4 }} />
						<div className={styles.info}>
							{INTERVIEW_DETAILS.email}
						</div>
					</div>

				</div>
			</div>

			<div className={styles.interview_completion_container}>
				<div className={styles.interview_completion_heading}>
					Interview Completion Code
				</div>

				<div className={styles.interview_completion_code_container}>
					<div className={styles.interview_completion_code_heading}>
						Enter the code shared with you by the HR to complete the separation process
					</div>
					<div className={styles.code_container}>
						<OTPInputExitInterview setOtpValue={setOtpValue} setOtpError={setOtpError} />
						{otpError
							? <div className={styles.error}>*required</div>
							: null}
					</div>
				</div>

				<div className={styles.interview_completion_btn}>
					<Button
						size="md"
						themeType="primary"
						onClick={onClickSubmit}
					>
						Complete Separation
					</Button>
				</div>

			</div>

		</div>
	);
}
export default ExitInterview;
