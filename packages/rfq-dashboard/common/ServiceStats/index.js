import { cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles.module.css';

const STATS_MAPPING = {
	promised_consolidated_revenue: {
		key: 'promised_consolidated_revenue',

		label: 'Promised Revenue',
	},
	promised_consolidated_profitability: {
		key: 'promised_consolidated_profitability',

		label: 'Promised Profitability',
	},
	utilization: {
		key: 'utilization',

		label: 'Utilization',
	},
};

function ServiceStats({ data = [], type = '', source = '' }) {
	console.log(data);
	const renderItem = (item) => {
		if (item.key === 'promised_revenue' || item.key === 'promised_consolidated_revenue') {
			return formatAmount({
				amount: data?.[item.key],

				currency: data?.[item.key]?.promised_consolidated_revenue_currency,

				options: {
					style: 'currency',

					currencyDisplay: 'code',

					maximumFractionDigits: 0,
				},
			});
		}
		if (item.key === 'promised_profitability' || item.key === 'utilization'
			|| item.key === 'promised_consolidated_profitability') {
			return typeof data?.[item?.key] === 'number' ? (
				<span
					className={cl`${data?.[item?.key] > 0 ? styles.green : styles.red}
					${data?.[item?.key] === 0 ? styles.black : ''}`}
				>
					{`${data?.[item?.key]}%`}
				</span>
			) : '-';
		}
		return null;
	};

	return (
		<div className={cl`${styles.revenue_profitability_utilisation_section} 
        ${(source
				=== 'ports-card') ? styles.service_stats_ports_section : ''}`}
		>
			{Object.keys(STATS_MAPPING).map((key) => (
				<div>
					<div className={styles.revenyue_profitability_utilization_name}>{STATS_MAPPING[key].label}</div>
					<div className={styles.stats_value}>{renderItem(STATS_MAPPING[key])}</div>
				</div>
			))}
		</div>
	);
}
export default ServiceStats;
