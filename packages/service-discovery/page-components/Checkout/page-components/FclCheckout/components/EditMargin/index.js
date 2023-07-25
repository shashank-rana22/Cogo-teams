import { Input } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState, useEffect, useContext } from 'react';

import BreakdownDetails from '../../../../commons/BreakdownDetails';
import { CheckoutContext } from '../../../../context';
import useUpdateCheckoutService from '../../../../hooks/useUpdateCheckoutService';

import AdditionalContent from './AdditionalContent';
import styles from './styles.module.css';

function EditMargin() {
	const {
		detail = {},
		rate,
		getCheckout,
		checkout_id,
	} = useContext(CheckoutContext);

	const convenience_line_item = rate?.booking_charges?.convenience_rate?.line_items[GLOBAL_CONSTANTS.zeroth_index];

	const [rateDetails, setRateDetails] = useState([]);
	const [additionalRemark, setAdditionalRemark] = useState('');
	const [convenienceDetails, setConvenienceDetails] = useState(() => ({
		convenience_rate: {
			price    : convenience_line_item?.price,
			currency : convenience_line_item?.currency,
			unit     : convenience_line_item?.unit,
		},
	}));
	const [noRatesPresent, setNoRatesPresent] = useState(false);

	const { handleDeleteRate, deleteRateLoading } = useUpdateCheckoutService({
		refetch: getCheckout,
		detail,
		checkout_id,
		setNoRatesPresent,
	});

	const { margin_approval_request_remarks = [] } = detail;

	useEffect(() => {
		setAdditionalRemark(margin_approval_request_remarks[GLOBAL_CONSTANTS.zeroth_index]);
	}, [margin_approval_request_remarks]);

	return (
		<div>
			<BreakdownDetails
				rateDetails={rateDetails}
				setRateDetails={setRateDetails}
				convenienceDetails={convenienceDetails}
				setConvenienceDetails={setConvenienceDetails}
				convenience_line_item={convenience_line_item}
				handleDeleteRate={handleDeleteRate}
				deleteRateLoading={deleteRateLoading}
				setNoRatesPresent={setNoRatesPresent}
			/>

			{noRatesPresent ? (
				<div className={styles.error}>
					** REMOVE SERVICES WITH (NO RATES) TAG TO SEND QUOTATION.
				</div>
			) : null}

			<div className={styles.additional_remark}>
				<div className={styles.sub_heading}>Additional Remark</div>

				<Input
					value={additionalRemark}
					onChange={setAdditionalRemark}
					placeholder="Additional Remark that KAM can write if he wants to based on customers input....."
				/>
			</div>

			<AdditionalContent
				additionalRemark={additionalRemark}
				rateDetails={rateDetails}
				convenienceDetails={convenienceDetails}
				convenience_line_item={convenience_line_item}
				noRatesPresent={noRatesPresent}
			/>
		</div>
	);
}

export default EditMargin;
