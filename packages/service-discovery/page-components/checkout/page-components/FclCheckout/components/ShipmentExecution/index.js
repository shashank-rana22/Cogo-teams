import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useContext, useState } from 'react';

import ControlledBooking from '../../../../commons/ControlledBooking';
import InvoicingParties from '../../../../commons/InvoicingParties';
import { CheckoutContext } from '../../../../context';

import BookingConfirmationFooter from './components/BookingConfirmationFooter';
import ShipmentDetails from './components/ShipmentDetails';
import styles from './styles.module.css';

function ShipmentExecution() {
	const {
		detail = {},
		checkoutMethod,
		getCheckout,
	} = useContext(CheckoutContext);

	const { checkout_approvals = [] } = detail;

	const { booking_status = '', manager_approval_proof } = checkout_approvals[GLOBAL_CONSTANTS.zeroth_index] || {};

	const [disableButtonConditions, setDisableButtonConditions] = useState(
		() => ({
			controlledBooking:
				checkoutMethod === 'controlled_checkout'
					? ['pending_approval', 'rejected'].includes(booking_status) || !manager_approval_proof
					: false,
		}),
	);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Initiate Shipment Execution</div>

			<ShipmentDetails />

			{checkoutMethod === 'controlled_checkout' ? (
				<ControlledBooking
					detail={detail}
					getCheckout={getCheckout}
				/>
			) : null}

			<InvoicingParties />

			<BookingConfirmationFooter
				detail={detail}
				checkoutMethod={checkoutMethod}
				disableButtonConditions={disableButtonConditions}
			/>
		</div>
	);
}

export default ShipmentExecution;
