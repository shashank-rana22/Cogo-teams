import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState, useContext } from 'react';

import { CheckoutContext } from '../../../../context';

import AdditionalContent from './components/AdditionalContent';
import BookingPreview from './components/BookingPreview';
import styles from './styles.module.css';

function PreviewBooking() {
	const {
		primaryService,
		rate,
	} = useContext(CheckoutContext);

	const {
		commodity_category = '',
		cargo_readiness_date = '',
		cargo_value,
		cargo_value_currency = '',
	} = primaryService;

	const [showBreakup, setShowBreakup] = useState(false);

	const [cargoDetails, setCargoDetails] = useState(() => ({
		commodity_category,
		cargo_readiness_date : cargo_readiness_date ? new Date(cargo_readiness_date) : undefined,
		cargo_value,
		cargo_value_currency : cargo_value_currency || GLOBAL_CONSTANTS.currency_code.USD,
	}));

	const [agreeTandC, setAgreeTandC] = useState(false);

	const formProps = useForm();

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Preview Booking</div>

			<BookingPreview
				rate={rate}
				setShowBreakup={setShowBreakup}
				showBreakup={showBreakup}
			/>

			<AdditionalContent
				cargoDetails={cargoDetails}
				setCargoDetails={setCargoDetails}
				agreeTandC={agreeTandC}
				setAgreeTandC={setAgreeTandC}
				formProps={formProps}
			/>
		</div>
	);
}

export default PreviewBooking;
