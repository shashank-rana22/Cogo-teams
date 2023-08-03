import { Button, Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCWaitForTimeSlots, IcMArrowDoubleRight } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useRef, useContext } from 'react';

import OTPLayout from '../../../../../../commons/WhatsappNoVerificationModal/WhatsappVerification/OTPLayout';
import { CheckoutContext } from '../../../../../../context';
import handleTimer from '../../../../../../utils/handleTimer';

import CogoPoint from './CogoPoint';
import domesticServices from './domestic-services.json';
import styles from './styles.module.css';
import TotalCost from './TotalCost';
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

	if (bookingConfirmationMode === 'whatsapp') {
		return 'Get Confirmation on Whatsapp';
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
	const {
		booking_proof,
		importer_exporter_poc = {},
		importer_exporter_poc_id,
	} = detail;

	const { whatsapp_number_eformat = '', whatsapp_verified = '' } = importer_exporter_poc;

	if (checkoutMethod === 'controlled_checkout') {
		return (
			['pending_approval', 'rejected'].includes(booking_status)
			|| !manager_approval_proof
			|| !isControlBookingDetailsFilled
		);
	}

	if (bookingConfirmationMode === 'whatsapp') {
		return (
			!whatsapp_number_eformat
			|| !whatsapp_verified
			|| !importer_exporter_poc_id
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
	getCheckout = () => {},
	bookingConfirmationMode = '',
	invoicingParties = [],
	isVeryRisky = false,
	setIsShipmentCreated = () => {},
	earnable_cogopoints = {},
}) {
	const {
		query: { shipment_id },
	} = useSelector(({ general }) => ({
		query: general?.query,
	}));

	const {
		primaryService = {},
		activated_on_paylater = {},
		checkout_type = '',
		invoice = {},
		isChannelPartner = false,
		rate = {},
	} = useContext(CheckoutContext);

	const timerRef = useRef(null);

	const {
		primary_service = '',
		credit_details = {},
		credit_terms_amd_condition = {},
		quotation_email_sent_at = '',
	} = detail || {};

	const { credit_source = '', is_any_invoice_on_credit = false } = credit_details;

	const { paylater_eligibility = false } = activated_on_paylater || {};

	const { is_tnc_accepted = false } = credit_terms_amd_condition || {};

	const domesticService = domesticServices.includes(primary_service);

	const disableConditionForFcl = primary_service === 'fcl_freight'
		&& paylater_eligibility
		&& isEmpty(
			primaryService.bl_category
				&& primaryService.bl_delivery_mode
				&& primaryService.bl_type,
		);

	const disableCondition = (typeof invoice?.selected_credit_days === 'undefined'
			&& !isChannelPartner
			&& !shipment_id
			&& !domesticService)
		|| (is_any_invoice_on_credit
			&& !is_tnc_accepted
			&& credit_source === 'pre_approved_clean_credit');

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
		checkoutMethod,
		getCheckout,
		bookingConfirmationMode,
		checkout_type,
		setIsShipmentCreated,
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
						size="xl"
						themeType="accent"
						onClick={handleSubmit}
						loading={submitButtonLoading}
						disabled={
							!quotation_email_sent_at
							|| disableConditionForFcl
							|| disableCondition
							|| isVeryRisky
							|| isEmpty(invoicingParties)
							|| getDisabledCondition({
								checkoutMethod,
								booking_status,
								manager_approval_proof,
								isControlBookingDetailsFilled,
								bookingConfirmationMode,
								detail,
							})
						}
					>
						<div className={styles.flex_column}>
							<div className={styles.button}>
								{getButtonLabel({
									checkoutMethod,
									booking_status,
									bookingConfirmationMode,
								})}

								<TotalCost rate={rate} />

								<IcMArrowDoubleRight width={14} height={14} />
							</div>

							<CogoPoint cogopoint={earnable_cogopoints} />
						</div>
					</Button>
				) : null}
			</div>

			{showOtpModal ? (
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
			) : null}
		</div>
	);
}

export default BookingConfirmationFooter;
