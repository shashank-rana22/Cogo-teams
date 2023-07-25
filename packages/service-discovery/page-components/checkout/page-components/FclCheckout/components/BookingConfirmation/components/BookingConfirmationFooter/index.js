import { Button, Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCWaitForTimeSlots } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useRef } from 'react';

import OTPLayout from '../../../../../../commons/WhatsappNoVerificationModal/WhatsappVerification/OTPLayout';
import handleTimer from '../../../../../../utils/handleTimer';

import styles from './styles.module.css';
import useHandleBookingConfirmationFooter from './useHandleBookingConfirmationFooter';

const SECOND_TO_MILLISECOND = 1000;

const OTP_LENGTH = 4;

const getButtonLabel = ({
	checkoutMethod,
	booking_status,
	bookingConfirmationMode,
}) => {
	if (
		checkoutMethod === 'controlled_checkout'
		&& booking_status === 'pending_approval'
	) {
		return 'Sent For Approval, Please wait...';
	}

	if (
		checkoutMethod === 'controlled_checkout'
		&& booking_status === 'rejected'
	) {
		return 'This Booking has been Rejected';
	}

	if (checkoutMethod === 'controlled_checkout') {
		return 'Send for Approval';
	}

	if (bookingConfirmationMode === 'mobile_otp') {
		return 'Send OTP For Approval';
	}

	return 'Place Booking';
};

const getDisabledCondition = ({
	checkoutMethod,
	booking_status,
	manager_approval_proof,
	isControlBookingDetailsFilled,
	bookingConfirmationMode = '',
	detail = {},
}) => {
	const { booking_proof } = detail;

	if (checkoutMethod === 'controlled_checkout') {
		return (
			['pending_approval', 'rejected'].includes(booking_status)
			|| !manager_approval_proof
			|| !isControlBookingDetailsFilled
		);
	}

	if (bookingConfirmationMode === 'booking_proof') {
		return isEmpty(booking_proof);
	}

	return false;
};

function BookingConfirmationFooter({
	detail = {},
	checkoutMethod = '',
	isControlBookingDetailsFilled = false,
	formProps = {},
	getCheckout = () => {},
	bookingConfirmationMode = '',
}) {
	const timerRef = useRef(null);

	const {
		handleSubmit,
		onClickSubmitOtp,
		submitButtonLoading,
		verifyOtpLoading,
		checkout_approvals,
		hasExpired = false,
		showOtpModal = false,
		setOtpValue = () => {},
		setShowOtpModal = () => {},
		otpValue = '',
		submitForOtpVerification = () => {},
		validity_end = '',
	} = useHandleBookingConfirmationFooter({
		detail,
		formProps,
		checkoutMethod,
		getCheckout,
		bookingConfirmationMode,
	});

	useEffect(() => {
		let time;

		if (!hasExpired) {
			const interval = setInterval(() => {
				time = handleTimer(validity_end);

				if (time) {
					timerRef.current.innerText = time;
				}
			}, SECOND_TO_MILLISECOND);

			if (!validity_end) {
				return () => clearInterval(interval);
			}
			return () => clearInterval(interval);
		}
		return () => {};
	}, [hasExpired, validity_end]);

	const {
		booking_status = '',
		manager_approval_proof = '',
	} = checkout_approvals[GLOBAL_CONSTANTS.zeroth_index] || {};

	return (
		<div className={styles.container}>
			<div className={styles.validity_time}>
				{!hasExpired ? (
					<div className={styles.flex}>
						<IcCWaitForTimeSlots
							height={24}
							width={24}
							style={{ marginRight: '8px' }}
						/>
						Expires in
					</div>
				) : null}

				<span
					id="timer"
					className={hasExpired ? styles.hidden : styles.visible}
					ref={timerRef}
				/>

				<span style={{ fontWeight: 400, marginLeft: '4px', color: '#eb3425' }}>
					{hasExpired ? 'This Quotation has expired' : ''}
				</span>
			</div>

			<div className={styles.button_container}>
				{!hasExpired && bookingConfirmationMode !== 'email' ? (
					<Button
						type="button"
						size="lg"
						onClick={handleSubmit}
						loading={submitButtonLoading}
						disabled={getDisabledCondition({
							checkoutMethod,
							booking_status,
							manager_approval_proof,
							isControlBookingDetailsFilled,
							bookingConfirmationMode,
							detail,
						})}
					>
						{getButtonLabel({
							checkoutMethod,
							booking_status,
							bookingConfirmationMode,
						})}
					</Button>
				) : null}
			</div>

			<Modal
				show={showOtpModal}
				onClose={() => setShowOtpModal(false)}
				onOuterClick={() => setShowOtpModal(false)}
			>
				<Modal.Header title="ENTER OTP RECEIVED" />

				<Modal.Body>
					<OTPLayout
						otpLength={OTP_LENGTH}
						setOtpValue={setOtpValue}
						loading={false}
						resendOtpTimerDuration={10}
						sendOtp={submitForOtpVerification}
					/>
				</Modal.Body>

				<Modal.Footer>
					<Button
						style={{
							width     : '100%',
							marginTop : 8,
							fontSize  : 12,
							height    : 36,
						}}
						onClick={onClickSubmitOtp}
						loading={verifyOtpLoading}
						disabled={otpValue.length < OTP_LENGTH}
					>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default BookingConfirmationFooter;
