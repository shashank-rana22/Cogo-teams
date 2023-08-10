import { Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty } from '@cogoport/utils';

import CC from '../../../../../../../../helpers/condition-constants';
import useGetPermission from '../../../../../../../../helpers/useGetPermission';

import Margins from './Margins';
import styles from './styles.module.css';

const DEFAULT_VALUE = 0;

function LineItem({ lineItem = {} }) {
	const { isConditionMatches, isChannelPartner } = useGetPermission();

	const {
		currency,
		margins,
		total_price_discounted = 0,
		price = 0,
	} = lineItem || {};

	let totalMarginValue = 0;
	if (isConditionMatches(CC.SEE_SALES_MARGIN, 'or')) {
		totalMarginValue = !isEmpty(margins)
			? (margins || []).filter((margin) => margin?.margin_type === 'demand')[GLOBAL_CONSTANTS.zeroth_index]
				?.total_margin_value
			: DEFAULT_VALUE;
	}
	if (isConditionMatches(CC.SEE_SUPPLY_MARGIN, 'or')) {
		totalMarginValue = !isEmpty(margins)
			? (margins || []).filter((margin) => margin?.margin_type === 'supply')[GLOBAL_CONSTANTS.zeroth_index]
				?.total_margin_value
			: DEFAULT_VALUE;
	}
	if (isConditionMatches(CC.SEE_ALL_MARGINS, 'or')) {
		(margins || []).forEach((margin) => {
			totalMarginValue += margin.total_margin_value || DEFAULT_VALUE;
		});
	}

	const priceWithoutMargin = totalMarginValue
		? total_price_discounted - totalMarginValue
		: total_price_discounted;

	if (isChannelPartner) {
		return (
			<div className={styles.container}>
				{formatAmount({
					amount  : price,
					currency,
					options : {
						style                 : 'currency',
						currencyDisplay       : 'symbol',
						maximumFractionDigits : 0,
					},
				})}
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.amount}>
				{formatAmount({
					amount  : priceWithoutMargin,
					currency,
					options : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						maximumFractionDigits : 0,
					},
				})}
			</div>

			{!isEmpty(margins) ? (
				<Margins margins={margins} />
			) : (
				<div>
					+
					{' '}
					<Pill className="no-margin">No margin</Pill>
				</div>
			)}
		</div>
	);
}

export default LineItem;
