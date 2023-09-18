import { Accordion } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState, useContext } from 'react';

import BreakdownDetails from '../../../../../../commons/BreakdownDetails';
import { CheckoutContext } from '../../../../../../context';

import styles from './styles.module.css';

function PriceBreakup({
	noRatesPresent = false,
	setNoRatesPresent = () => {},
	getCheckoutInvoices = () => {},
}) {
	const { rate = {} } = useContext(CheckoutContext);

	const convenience_line_item = rate?.booking_charges?.convenience_rate?.line_items[GLOBAL_CONSTANTS.zeroth_index];

	const [rateDetails, setRateDetails] = useState([]);

	const [convenienceDetails, setConvenienceDetails] = useState(() => ({
		convenience_rate: {
			price    : convenience_line_item?.price,
			currency : convenience_line_item?.currency,
			unit     : convenience_line_item?.unit,
			quantity : convenience_line_item?.quantity,
		},
	}));

	return (
		<Accordion
			className={styles.container}
			type="form"
			title="View Price Breakup"
			animate
			isOpen
		>
			<BreakdownDetails
				rateDetails={rateDetails}
				setRateDetails={setRateDetails}
				convenienceDetails={convenienceDetails}
				source="booking_confirmation"
				setNoRatesPresent={setNoRatesPresent}
				noRatesPresent={noRatesPresent}
				setConvenienceDetails={setConvenienceDetails}
				getCheckoutInvoices={getCheckoutInvoices}
			/>
		</Accordion>
	);
}

export default PriceBreakup;
