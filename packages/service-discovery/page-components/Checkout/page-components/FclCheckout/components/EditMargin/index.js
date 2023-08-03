import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState, useContext } from 'react';

import BreakdownDetails from '../../../../commons/BreakdownDetails';
import { CheckoutContext } from '../../../../context';
import useUpdateCheckoutService from '../../../../hooks/useUpdateCheckoutService';

import AdditionalContent from './AdditionalContent';
import styles from './styles.module.css';

function EditMargin({ state = '' }) {
	const {
		detail = {},
		rate,
		getCheckout,
		checkout_id,
	} = useContext(CheckoutContext);

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
	const [noRatesPresent, setNoRatesPresent] = useState(false);

	const { handleDeleteRate, deleteRateLoading } = useUpdateCheckoutService({
		refetch: getCheckout,
		detail,
		checkout_id,
	});

	return (
		<div>
			<BreakdownDetails
				rateDetails={rateDetails}
				setRateDetails={setRateDetails}
				convenienceDetails={convenienceDetails}
				setConvenienceDetails={setConvenienceDetails}
				handleDeleteRate={handleDeleteRate}
				deleteRateLoading={deleteRateLoading}
				setNoRatesPresent={setNoRatesPresent}
				source="edit_margin"
			/>

			{noRatesPresent ? (
				<div className={styles.error}>
					** REMOVE SERVICES WITH (NO RATES) TAG TO SEND QUOTATION.
				</div>
			) : null}

			<AdditionalContent
				rateDetails={rateDetails}
				convenienceDetails={convenienceDetails}
				convenience_line_item={convenience_line_item}
				noRatesPresent={noRatesPresent}
				state={state}
			/>
		</div>
	);
}

export default EditMargin;
