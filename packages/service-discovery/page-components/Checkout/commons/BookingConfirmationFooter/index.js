import { Button, Modal } from '@cogoport/components';
import OTPInput from '@cogoport/forms/page-components/Business/OTPInput';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCWaitForTimeSlots, IcMArrowDoubleRight, IcCFtick } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import { CheckoutContext } from '../../context';

import CogoPoint from './CogoPoint';
import domesticServices from './domestic-services.json';
import MarginModal from './MarginModal';
import styles from './styles.module.css';
import TotalCost from './TotalCost';
import useHandleBookingConfirmationFooter from './useHandleBookingConfirmationFooter';
import getButtonLabel from './utils/getButtonLabel';
import getDisabledCondition from './utils/getDisabledCondition';

const OTP_LENGTH = 4;

function AddToCartButton({ updateCheckout = () => {}, detail = {} }) {
	const { tags = [], quotation_email_sent_at = '', id = '' } = detail;

	if (!quotation_email_sent_at) {
		return null;
	}

	const isAddedToCart = tags.includes('added_to_cart');

	const handleAddToCart = () => {
		if (isAddedToCart) {
			return;
		}

		updateCheckout({ values: { id, tags: [...tags, 'added_to_cart'] } });
	};

	return (
		<Button
			type="button"
			size="xl"
			themeType="secondary"
			style={{ marginRight: '12px' }}
			onClick={handleAddToCart}
			disabled={isAddedToCart}
		>
			<div className={styles.flex} style={{ justifyContent: 'space-between' }}>
				{isAddedToCart ? 'Added to cart' : 'Add to cart'}

				{isAddedToCart ? <IcCFtick className={styles.cart_icon} /> : (
					<img
						src={GLOBAL_CONSTANTS.image_url.cart_png}
						alt="order"
						className={styles.cart_icon}
					/>
				)}
			</div>
		</Button>
	);
}

function BookingConfirmationFooter({
	detail = {},
	checkoutMethod = '',
	isControlBookingDetailsFilled = false,
	bookingConfirmationMode = '',
	invoicingParties = [],
	isVeryRisky = false,
	setIsShipmentCreated = () => {},
	earnable_cogopoints = {},
	setError = () => {},
	error = '',
	isAssistedBookingNotAllowed = false,
	noRatesPresent = false,
	updateCheckout = () => {},
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
		rate = {},
		handleUnlockLatestRate = () => {},
		createSearchLoading = false,
	} = useContext(CheckoutContext);

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

	const disableConditionForTncAndPaymentMethods = (typeof invoice?.selected_credit_days === 'undefined'
			&& !shipment_id
			&& !domesticService)
		|| (is_any_invoice_on_credit
			&& !is_tnc_accepted
			&& credit_source === 'pre_approved_clean_credit');

	const isKycPending = (detail?.importer_exporter?.kyc_status !== 'verified'
	&& !detail?.importer_exporter?.skippable_checks?.includes('kyc'));

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
		showMarginModal = false,
		setShowMarginModal = () => {},
		timerRef,
	} = useHandleBookingConfirmationFooter({
		rate,
		detail,
		checkoutMethod,
		bookingConfirmationMode,
		checkout_type,
		setIsShipmentCreated,
		setError,
		isAssistedBookingNotAllowed,
		invoicingParties,
		disableConditionForFcl,
		noRatesPresent,
		isKycPending,
	});

	const {
		booking_status = '',
		manager_approval_proof = '',
	} = checkout_approvals[GLOBAL_CONSTANTS.zeroth_index] || {};

	const disableConditionForBookingMethods = getDisabledCondition({
		checkoutMethod,
		booking_status,
		manager_approval_proof,
		isControlBookingDetailsFilled,
		bookingConfirmationMode,
		detail,
	});

	const disableButton = isAssistedBookingNotAllowed
	|| !quotation_email_sent_at
	|| disableConditionForFcl
	|| disableConditionForTncAndPaymentMethods
	|| isVeryRisky
	|| noRatesPresent
	|| isEmpty(invoicingParties)
	|| disableConditionForBookingMethods
	|| isKycPending;

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

				{hasExpired ? (
					<span className={styles.quotation_expired}>
						This Quotation has expired
						{' '}
						<Button
							loading={createSearchLoading}
							size="lg"
							type="button"
							themeType="link"
							style={{ marginLeft: '4px' }}
							onClick={handleUnlockLatestRate}
						>
							Create New Search
						</Button>
					</span>
				) : null}
			</div>

			{!isEmpty(error) ? (
				<div className={styles.error}>
					{error}
					....
				</div>
			) : null}

			{!hasExpired && bookingConfirmationMode !== 'email' ? (
				<div className={styles.button_container}>
					<AddToCartButton
						updateCheckout={updateCheckout}
						detail={detail}
					/>

					<Button
						type="button"
						size="xl"
						themeType="accent"
						onClick={handleSubmit}
						loading={submitButtonLoading}
						disabled={disableButton}
					>
						<div className={styles.flex_column}>
							<div className={styles.button}>
								{getButtonLabel({
									checkoutMethod,
									booking_status,
									bookingConfirmationMode,
								})}

								<TotalCost rate={rate} disableButton={disableButton} />

								<IcMArrowDoubleRight width={14} height={14} />
							</div>

							<CogoPoint cogopoint={earnable_cogopoints} />
						</div>
					</Button>
				</div>
			) : null}

			{showMarginModal ? (
				<MarginModal
					bookingConfirmationMode={bookingConfirmationMode}
					showMarginModal={showMarginModal}
					setShowMarginModal={setShowMarginModal}
					handleSubmit={handleSubmit}
					loading={submitButtonLoading}
				/>
			) : null}

			{showOtpModal ? (
				<Modal
					show={showOtpModal}
					onClose={() => setShowOtpModal(false)}
					onOuterClick={() => setShowOtpModal(false)}
				>
					<Modal.Header title="ENTER OTP RECEIVED" />

					<Modal.Body>
						<OTPInput
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
