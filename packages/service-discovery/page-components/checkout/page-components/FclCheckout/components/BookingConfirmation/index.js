import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useContext, useState } from 'react';

import ControlledBooking from '../../../../commons/ControlledBooking';
import InvoicingParties from '../../../../commons/InvoicingParties';
import { CheckoutContext } from '../../../../context';

import BookingConfirmationFooter from './components/BookingConfirmationFooter';
// import ShipmentDetails from './components/ShipmentDetails';
import ShippingPreferences from './components/ShippingPreferences';
import styles from './styles.module.css';

function BookingConfirmation() {
	const {
		detail = {},
		checkoutMethod,
		getCheckout,
	} = useContext(CheckoutContext);

	const { services = {}, checkout_approvals = [] } = detail;

	const controlledBookingServices = Object.values(services).filter(
		(service) => (
			service.service_type === 'fcl_freight'
				&& service.container_type === 'refer'
		),
	);
	const iscommercialInvoicePresent = !isEmpty(
		controlledBookingServices?.[GLOBAL_CONSTANTS.zeroth_index]
			?.commercial_invoice_url || '',
	);

	const [isControlBookingDetailsFilled, setIsControlBookingDetailsFilled] = useState(iscommercialInvoicePresent);

	const formProps = useForm();

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Set Invoicing Parties</div>

			{/* <ShipmentDetails /> */}

			{checkoutMethod === 'controlled_checkout' ? (
				<ControlledBooking
					checkout_approvals={checkout_approvals}
					getCheckout={getCheckout}
					setIsControlBookingDetailsFilled={setIsControlBookingDetailsFilled}
					controlledBookingServices={controlledBookingServices}
				/>
			) : null}

			<InvoicingParties />

			<ShippingPreferences formProps={formProps} />

			<BookingConfirmationFooter
				detail={detail}
				checkoutMethod={checkoutMethod}
				isControlBookingDetailsFilled={isControlBookingDetailsFilled}
			/>
		</div>
	);
}

export default BookingConfirmation;
