import { useContext, useRef } from 'react';

import AdditionalConditions from '../../../../commons/AdditionalConditions';
import BookingConfirmationFooter from '../../../../commons/BookingConfirmationFooter';
import BookingTypeOptions from '../../../../commons/BookingTypeOptions';
import ControlledBooking from '../../../../commons/ControlledBooking';
import InvoicingParties from '../../../../commons/InvoicingParties';
import PriceBreakup from '../../../../commons/PriceBreakup';
import ShareQuotation from '../../../../commons/ShareQuotation';
import { CheckoutContext } from '../../../../context';

import styles from './styles.module.css';
import useHandleBookingConfirmation from './useHandleBookingConfirmation';

function BookingConfirmation({ setIsShipmentCreated = () => {} }) {
	const {
		detail,
		getCheckout,
		showSendTncEmail,
		showOverallCreditRisk,
		updateCheckout,
		updateLoading,
		loading,
		checkoutMethod,
		earnable_cogopoints = {},
		kycShowCondition,
		orgData = {},
		isAssistedBookingNotAllowed = false,
	} = useContext(CheckoutContext);

	const ref = useRef({});

	const {
		radioOption,
		checkout_approvals,
		isControlBookingDetailsFilled,
		setIsControlBookingDetailsFilled,
		controlledBookingServices,
		bookingConfirmationMode = '',
		setBookingConfirmationMode = () => {},
		invoicingParties = [],
		setInvoicingParties = () => {},
		isVeryRisky = false,
		setIsVeryRisky = () => {},
		error = '',
		setError = () => {},
		noRatesPresent = false,
		setNoRatesPresent = () => {},
	} = useHandleBookingConfirmation({ checkoutMethod, detail });

	const { is_any_invoice_on_credit = false } = detail?.credit_details || {};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Set Invoicing Parties</div>

			{checkoutMethod === 'controlled_checkout' ? (
				<ControlledBooking
					checkout_approvals={checkout_approvals}
					getCheckout={getCheckout}
					setIsControlBookingDetailsFilled={setIsControlBookingDetailsFilled}
					controlledBookingServices={controlledBookingServices}
				/>
			) : null}

			<InvoicingParties
				invoicingParties={invoicingParties}
				setInvoicingParties={setInvoicingParties}
				ref={ref}
			/>

			<PriceBreakup
				noRatesPresent={noRatesPresent}
				setNoRatesPresent={setNoRatesPresent}
				getCheckoutInvoices={ref?.current?.getCheckoutInvoices}
			/>

			<AdditionalConditions
				detail={detail}
				updateCheckout={updateCheckout}
				updateLoading={updateLoading}
				showSendTncEmail={showSendTncEmail}
				showOverallCreditRisk={showOverallCreditRisk}
				setIsVeryRisky={setIsVeryRisky}
				getCheckout={getCheckout}
				loading={loading}
				orgData={orgData}
				source="booking_confirmation"
				kycShowCondition={kycShowCondition}
			/>

			<ShareQuotation noRatesPresent={noRatesPresent} bookingConfirmationMode={bookingConfirmationMode} />

			<BookingTypeOptions
				radioOption={radioOption}
				bookingConfirmationMode={bookingConfirmationMode}
				setBookingConfirmationMode={setBookingConfirmationMode}
				isAssistedBookingNotAllowed={isAssistedBookingNotAllowed}
			/>

			<BookingConfirmationFooter
				detail={detail}
				checkoutMethod={checkoutMethod}
				isControlBookingDetailsFilled={isControlBookingDetailsFilled}
				bookingConfirmationMode={bookingConfirmationMode}
				invoicingParties={invoicingParties}
				isVeryRisky={isVeryRisky && is_any_invoice_on_credit}
				setIsShipmentCreated={setIsShipmentCreated}
				earnable_cogopoints={earnable_cogopoints}
				setError={setError}
				error={error}
				isAssistedBookingNotAllowed={isAssistedBookingNotAllowed}
				noRatesPresent={noRatesPresent}
				updateCheckout={updateCheckout}
			/>
		</div>
	);
}

export default BookingConfirmation;
