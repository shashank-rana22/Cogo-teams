import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import BreakdownDetails from '../../../../../../commons/BreakdownDetails';

import BookingDetails from './BookingDetails';
import styles from './styles.module.css';

function BookingPreview({ rate = {}, setShowBreakup = () => {}, showBreakup = false }) {
	const handling_fees_line_item =	rate?.booking_charges?.handling_fees?.line_items[
		GLOBAL_CONSTANTS.zeroth_index
	] || {};

	const [rateDetails, setRateDetails] = useState([]);
	const [noRatesPresent, setNoRatesPresent] = useState([]);
	const [handlingFeeDetails, setHandlingFeeDetails] = useState(() => ({
		handling_fees: {
			price    : handling_fees_line_item?.price,
			currency : handling_fees_line_item?.currency,
			unit     : handling_fees_line_item?.unit,
			quantity : handling_fees_line_item?.quantity,
		},
		is_available: !isEmpty(handling_fees_line_item),
	}));

	const convenience_line_item = rate?.booking_charges?.convenience_rate?.line_items[GLOBAL_CONSTANTS.zeroth_index];

	const convenienceDetails = {
		convenience_rate: {
			price    : convenience_line_item?.price,
			currency : convenience_line_item?.currency,
			unit     : convenience_line_item?.unit,
		},
	};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Booking Preview</div>

			<BookingDetails setShowBreakup={setShowBreakup} showBreakup={showBreakup} />

			{showBreakup ? (
				<div className={styles.breakdown_details}>
					<div className={cl`${styles.heading} ${styles.commercial_view}`}>Commercial View</div>

					<BreakdownDetails
						rateDetails={rateDetails}
						setRateDetails={setRateDetails}
						convenienceDetails={convenienceDetails}
						source="preview_booking"
						setNoRatesPresent={setNoRatesPresent}
						noRatesPresent={noRatesPresent}
						handlingFeeDetails={handlingFeeDetails}
						setHandlingFeeDetails={setHandlingFeeDetails}
					/>
				</div>
			) : null}
		</div>
	);
}

export default BookingPreview;
