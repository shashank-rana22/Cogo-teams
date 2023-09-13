import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';

import { displayMarginValue } from '../../../../../../helpers/dynamic-values';

import styles from './styles.module.css';

const DEFAULT_VALUE = 0;
const ROUND_OFF_VALUE = 2;
const ONE = 1;
const PERCENT_VALUE = 100;

function CodeMargin({
	item = {},
	editedDemandMargin = {},
	style = {},
	id_prefix = '',
	isautoDiscountApplicable = false,
	promotion_discounts = {},
}) {
	const { quantity = 1, unit = '' } = item || {};

	const { value = 0 } =	promotion_discounts || {};

	const oldDemandMargin =	((item.margins || []).find(
		(marginObj) => marginObj?.margin_type === 'demand',
	)?.total_margin_value || DEFAULT_VALUE)
	* (isautoDiscountApplicable ? ONE - value / PERCENT_VALUE : ONE);

	const sell_price_without_demand = (item?.total_price_discounted || DEFAULT_VALUE) - oldDemandMargin;

	const new_demand_margin = displayMarginValue(oldDemandMargin, {
		lineItem     : item,
		editedMargin : editedDemandMargin,
		value,
		isautoDiscountApplicable,
	});

	const total_sell_price = sell_price_without_demand + new_demand_margin;

	const total = formatAmount({
		amount   : total_sell_price,
		currency : item?.currency,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 2,
		},
	});

	return (
		<div className={styles.container}>
			<div
				style={style}
				id={`${id_prefix}_checkout_edit_margin_buy_price`}
				data-test-currency={item?.currency}
				data-test-amount={total}
			>
				{total}
			</div>

			<div className={styles.per_container_value}>
				{`${(total_sell_price / quantity).toFixed(ROUND_OFF_VALUE)} ${
					GLOBAL_CONSTANTS.freight_unit_mapping[unit]
					|| `/${startCase(unit || 'Ctr')}`
				}`}
			</div>
		</div>
	);
}

export default CodeMargin;
