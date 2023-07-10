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
	} = useContext(CheckoutContext);

	const { margin_approval_request_remarks = [] } = detail;

	const { hs_code, cargo_readiness_date, cargo_value	} = primaryService;

	const [showBreakup, setShowBreakup] = useState(false);
	const [additionalRemark, setAdditionalRemark] = useState(
		() => margin_approval_request_remarks[GLOBAL_CONSTANTS.zeroth_index] || '',
	);
	const [cargoDetails, setCargoDetails] = useState(() => ({ hs_code, cargo_readiness_date, cargo_value }));
	const [agreeTandC, setAgreeTandC] = useState(false);
	const [isVeryRisky, setIsVeryRisky] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Preview Booking</div>

			<BookingPreview rate={rate} setShowBreakup={setShowBreakup} showBreakup={showBreakup} />

			<AdditionalContent
				value={additionalRemark}
				onChange={setAdditionalRemark}
				cargoDetails={cargoDetails}
				setCargoDetails={setCargoDetails}
				agreeTandC={agreeTandC}
				setAgreeTandC={setAgreeTandC}
				setIsVeryRisky={setIsVeryRisky}
			/>
		</div>
	);
}

export default PreviewBooking;
