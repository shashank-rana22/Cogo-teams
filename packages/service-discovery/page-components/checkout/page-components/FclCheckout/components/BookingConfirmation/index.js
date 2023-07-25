import { useContext } from 'react';

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
		detail = {},
		checkoutMethod,
		getCheckout,
		updateCheckout = () => {},
		updateLoading = false,
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
	} = useHandleBookingConfirmation();

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

			<InvoicingParties />

			<BookingTypeOptions
				radioOption={radioOption}
				bookingConfirmationMode={bookingConfirmationMode}
				setBookingConfirmationMode={setBookingConfirmationMode}
				detail={detail}
				updateCheckout={updateCheckout}
				updateLoading={updateLoading}
			/>

			<ShippingPreferences formProps={formProps} />

			<BookingConfirmationFooter
				detail={detail}
				checkoutMethod={checkoutMethod}
				isControlBookingDetailsFilled={isControlBookingDetailsFilled}
				formProps={formProps}
				getCheckout={getCheckout}
				bookingConfirmationMode={bookingConfirmationMode}
			/>
		</div>
	);
}

export default BookingConfirmation;
