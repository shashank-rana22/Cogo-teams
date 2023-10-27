import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { displayMarginValue } from '../../../../../../utils/dynamicValues';

import styles from './styles.module.css';

function CodeMargin({ item, editedDemandMargin = {} }) {
	const { quantity = 1, unit = '' } = item || {};

	const oldDemandMargin =		(item.margins || []).find(
		(marginObj) => marginObj?.margin_type === 'demand',
	)?.total_margin_value || 0;

	const sell_price_without_demand = (item?.total_price_discounted || 0) - oldDemandMargin;

	const new_demand_margin = displayMarginValue(oldDemandMargin, {
		lineItem     : item,
		editedMargin : editedDemandMargin,
	});

	const total_sell_price = sell_price_without_demand + new_demand_margin;

	const total = formatAmount({
		amount   : total_sell_price,
		currency : item?.currency,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 2,
			minimumFractionDigits : 2,
		},
	});

	return (
		<div>
			<div className={styles.total_text}>{total}</div>
			<div className={styles.per_container_value}>
				{`${(total_sell_price / quantity).toFixed(4)} ${
					GLOBAL_CONSTANTS.freight_unit_mapping[unit]
				|| `/${startCase(unit || 'Ctr')}`
				}`}
			</div>
		</div>
	);
}

export default CodeMargin;
