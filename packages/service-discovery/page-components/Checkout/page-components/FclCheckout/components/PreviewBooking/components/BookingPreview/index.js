import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState } from 'react';

import BreakdownDetails from '../../../../../../commons/BreakdownDetails';

import BookingDetails from './BookingDetails';
import styles from './styles.module.css';

function BookingPreview({ rate = {}, setShowBreakup = () => {}, showBreakup = false }) {
	const [rateDetails, setRateDetails] = useState([]);
	const [noRatesPresent, setNoRatesPresent] = useState([]);

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
						convenience_line_item={convenience_line_item}
						setRateDetails={setRateDetails}
						convenienceDetails={convenienceDetails}
						source="preview_booking"
						setNoRatesPresent={setNoRatesPresent}
						noRatesPresent={noRatesPresent}
					/>
				</div>
			) : null}
		</div>
	);
}

export default BookingPreview;
