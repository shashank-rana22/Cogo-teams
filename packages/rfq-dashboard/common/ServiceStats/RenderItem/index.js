import { cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles.module.css';

function RenderItem({ item = {}, data = [] }) {
	if (item.key === 'promised_revenue') {
		return formatAmount({
			amount: data?.[item.key] || data?.promised_consolidated_revenue,

			currency: data?.promised_consolidated_revenue_currency
					|| data?.[item.key]?.promised_revenue_currency,

			options: {
				style                 : 'currency',
				currencyDisplay       : 'code',
				maximumFractionDigits : 0,
			},
		});
	}
	if (item.key === 'promised_profitability') {
		let profitability = data?.[item?.key];
		if (typeof (data?.promised_consolidated_profitability) === 'number') {
			profitability = data?.promised_consolidated_profitability;
		}
		return typeof profitability === 'number' ? (
			<span
				className={cl`${data?.[item?.key] > 0 ? styles.green : styles.red}
					${data?.[item?.key] === 0 ? styles.black : ''}`}
			>
				{`${(profitability).toFixed(2)}%`}
			</span>
		) : '-';
	}

	return '-';
}

export default RenderItem;
