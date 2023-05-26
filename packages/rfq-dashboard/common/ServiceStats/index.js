import { cl } from '@cogoport/components';

import styles from './styles.module.css';

const STATS_MAPPING = {
	promised_revenue: {
		key   : 'promised_revenue',
		label : 'Promised Revenue',
	},
	promised_profitability: {
		key   : 'promised_profitability',
		label : 'Promised Profitability',
	},
	utilization: {
		key   : 'utilization',
		label : 'Utilization',
	},
};

function ServiceStats({ data = [], type = '', source = '' }) {
	const renderItem = (item) => {
		if (item.key === 'promised_revenue') {
			return `${data?.[item.key]?.promised_revenue_currency} ${data?.[item.key]}`;
		}
		if (item.key === 'promised_profitability' || item.key === 'utilization') {
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
