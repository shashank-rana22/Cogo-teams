import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import { displayMarginValue } from '../../../../../../utils/dynamicValues';

import styles from './styles.module.css';

function CodeMargin({ item, editedDemandMargin = {} }) {
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
			maximumFractionDigits : 0,
		},
	});

	return <div className={styles.total_text}>{total}</div>;
}

export default CodeMargin;
