import { Accordion } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useState, useContext } from 'react';

import { CheckoutContext } from '../../context';
import BreakdownDetails from '../BreakdownDetails';

import styles from './styles.module.css';

function PriceBreakup({
	noRatesPresent = false,
	setNoRatesPresent = () => {},
	getCheckoutInvoices = () => {},
}) {
	const { rate = {} } = useContext(CheckoutContext);

	const convenience_line_item = rate?.booking_charges?.convenience_rate?.line_items[GLOBAL_CONSTANTS.zeroth_index];

	const handling_fees_line_item =	rate?.booking_charges?.handling_fees?.line_items[
		GLOBAL_CONSTANTS.zeroth_index
	] || {};

	const [rateDetails, setRateDetails] = useState([]);

	const [convenienceDetails, setConvenienceDetails] = useState(() => ({
		convenience_rate: {
			price    : convenience_line_item?.price,
			currency : convenience_line_item?.currency,
			unit     : convenience_line_item?.unit,
			quantity : convenience_line_item?.quantity,
		},
	}));
	const [handlingFeeDetails, setHandlingFeeDetails] = useState(() => ({
		handling_fees: {
			price    : handling_fees_line_item?.price,
			currency : handling_fees_line_item?.currency,
			unit     : handling_fees_line_item?.unit,
			quantity : handling_fees_line_item?.quantity,
		},
		is_available: !isEmpty(handling_fees_line_item),
	}));

	return (
		<Accordion
			className={styles.container}
			type="form"
			title="View Price Breakup"
			animate
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
				handlingFeeDetails={handlingFeeDetails}
				setHandlingFeeDetails={setHandlingFeeDetails}
			/>
		</Accordion>
	);
}

export default PriceBreakup;
