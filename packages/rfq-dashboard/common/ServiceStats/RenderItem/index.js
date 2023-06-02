import { cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles.module.css';

const mapping = {
	promised_revenue({ data, item }) {
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
	},
	promised_profitability({ data, item }) {
		let profitability = data?.[item?.key];
		if (typeof (data?.promised_consolidated_profitability) === 'number') {
			profitability = data?.promised_consolidated_profitability;
		}
		return typeof profitability === 'number' ? (
			<span
				className={cl`${profitability > 0 ? styles.green : styles.red}
					${profitability === 0 ? styles.black : ''}`}
			>
				{`${(profitability).toFixed(2)}%`}
			</span>
		) : '-';
	},
	default() {
		return '-';
	},
};

function RenderItem({ item = {}, data = [] }) {
	const key = item.key in mapping ? item.key : 'default';
	return mapping[key]?.({ data, item });
}

export default RenderItem;
