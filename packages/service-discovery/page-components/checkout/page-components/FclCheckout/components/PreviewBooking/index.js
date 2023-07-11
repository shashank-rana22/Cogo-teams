import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState, useContext } from 'react';

import { CheckoutContext } from '../../../../context';

import AdditionalContent from './components/AdditionalContent';
import BookingPreview from './components/BookingPreview';
import styles from './styles.module.css';

function PreviewBooking() {
	const {
		detail = {},
		primaryService,
		rate,
		checkoutMethod,
	} = useContext(CheckoutContext);

	const { margin_approval_request_remarks = [], checkout_approvals = [] } = detail;

	const { hs_code, cargo_readiness_date, cargo_value	} = primaryService;

	const { booking_status = '', manager_approval_proof } =		checkout_approvals[0] || {};

	const [showBreakup, setShowBreakup] = useState(false);
	const [additionalRemark, setAdditionalRemark] = useState(
		() => margin_approval_request_remarks[GLOBAL_CONSTANTS.zeroth_index] || '',
	);
	const [cargoDetails, setCargoDetails] = useState(() => ({ hs_code, cargo_readiness_date, cargo_value }));
	const [isVeryRisky, setIsVeryRisky] = useState(false);
	const [disableButtonConditions, setDisableButtonConditions] = useState(() => ({
		agreeTandC        : true,
		controlledBooking : checkoutMethod === 'controlled_checkout'
			? ['pending_approval', 'rejected'].includes(booking_status) || !manager_approval_proof
			: false,
	}));

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Preview Booking</div>

			<BookingPreview rate={rate} setShowBreakup={setShowBreakup} showBreakup={showBreakup} />

			<AdditionalContent
				value={additionalRemark}
				onChange={setAdditionalRemark}
				cargoDetails={cargoDetails}
				setCargoDetails={setCargoDetails}
				setIsVeryRisky={setIsVeryRisky}
				isVeryRisky={isVeryRisky}
				disableButtonConditions={disableButtonConditions}
				setDisableButtonConditions={setDisableButtonConditions}
			/>
		</div>
	);
}

export default PreviewBooking;
