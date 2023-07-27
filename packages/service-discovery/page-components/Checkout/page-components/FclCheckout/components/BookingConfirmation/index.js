import { useContext } from 'react';

import AdditionalConditions from '../../../../commons/AdditionalConditions';
import ControlledBooking from '../../../../commons/ControlledBooking';
import InvoicingParties from '../../../../commons/InvoicingParties';
import { CheckoutContext } from '../../../../context';

import BookingConfirmationFooter from './components/BookingConfirmationFooter';
import BookingTypeOptions from './components/BookingTypeOptions';
import ShippingPreferences from './components/ShippingPreferences';
import styles from './styles.module.css';
import useHandleBookingConfirmation from './useHandleBookingConfirmation';

function BookingConfirmation() {
	const {
		detail,
		primaryService,
		getCheckout,
		showSendTncEmail,
		showOverallCreditRisk,
		updateCheckout,
		updateLoading,
		loading,
		checkoutMethod,
	} = useContext(CheckoutContext);

	const {
		radioOption,
		checkout_approvals,
		isControlBookingDetailsFilled,
		setIsControlBookingDetailsFilled,
		formProps,
		controlledBookingServices,
		bookingConfirmationMode = '',
		setBookingConfirmationMode = () => {},
		invoicingParties = [],
		setInvoicingParties = () => {},
		isVeryRisky = false,
		setIsVeryRisky = () => {},
	} = useHandleBookingConfirmation();

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

			<InvoicingParties invoicingParties={invoicingParties} setInvoicingParties={setInvoicingParties} />

			<AdditionalConditions
				detail={detail}
				updateCheckout={updateCheckout}
				updateLoading={updateLoading}
				showSendTncEmail={showSendTncEmail}
				showOverallCreditRisk={showOverallCreditRisk}
				setIsVeryRisky={setIsVeryRisky}
				getCheckout={getCheckout}
				loading={loading}
				source="booking_confirmation"
			/>

			<ShippingPreferences
				formProps={formProps}
				primaryService={primaryService}
			/>

			<BookingTypeOptions
				radioOption={radioOption}
				bookingConfirmationMode={bookingConfirmationMode}
				setBookingConfirmationMode={setBookingConfirmationMode}
			/>

			<BookingConfirmationFooter
				detail={detail}
				checkoutMethod={checkoutMethod}
				isControlBookingDetailsFilled={isControlBookingDetailsFilled}
				formProps={formProps}
				bookingConfirmationMode={bookingConfirmationMode}
				invoicingParties={invoicingParties}
				isVeryRisky={isVeryRisky && is_any_invoice_on_credit}
			/>
		</div>
	);
}

export default BookingConfirmation;
