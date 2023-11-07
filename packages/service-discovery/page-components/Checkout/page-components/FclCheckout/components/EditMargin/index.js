import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useState, useContext } from 'react';

import BreakdownDetails from '../../../../commons/BreakdownDetails';
import { CheckoutContext } from '../../../../context';

import AdditionalContent from './AdditionalContent';
import BookingPreview from './BookingPreview';

function EditMargin({ state = '' }) {
	const { rate, detail = {} } = useContext(CheckoutContext);

	const { source = '' } = detail;

	const convenience_line_item = rate?.booking_charges?.convenience_rate?.line_items[
		GLOBAL_CONSTANTS.zeroth_index
	];

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
	const [noRatesPresent, setNoRatesPresent] = useState(false);

	return (
		<>
			<BookingPreview source={source} />

			<BreakdownDetails
				rateDetails={rateDetails}
				setRateDetails={setRateDetails}
				convenienceDetails={convenienceDetails}
				setConvenienceDetails={setConvenienceDetails}
				setNoRatesPresent={setNoRatesPresent}
				handlingFeeDetails={handlingFeeDetails}
				setHandlingFeeDetails={setHandlingFeeDetails}
				source="edit_margin"
			/>

			<AdditionalContent
				rateDetails={rateDetails}
				convenienceDetails={convenienceDetails}
				convenience_line_item={convenience_line_item}
				noRatesPresent={noRatesPresent}
				state={state}
				handlingFeeDetails={handlingFeeDetails}
			/>
		</>
	);
}

export default EditMargin;
