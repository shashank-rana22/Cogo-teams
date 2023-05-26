import { cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import { getFormattedAmount } from '../helpers/getFormattedSum';

import styles from './styles.module.css';

function ServiceStats({ data = [], type = '', source = '' }) {
	const renderItem = (value, item) => {
		if (item === 'promised_consolidated_revenue') {
			return getFormattedAmount(value, 'INR');
		}
		if (item === 'promised_consolidated_profitability') {
			return `${Math.round(value)}%`;
		}
		return getFormattedAmount(value, 'INR');
	};

	return (
		<div className={cl`${styles.revenue_profitability_utilisation_section} 
        ${(source
			=== 'ports-card') ? styles.service_stats_ports_section : ''}`}
		>
			{Object.keys(data).map((item) => (
				<div className={cl`${type === 'preview-stats' ? styles.individual_section : ''}`}>
					<div className={styles.revenyue_profitability_utilization_name}>{startCase(item)}</div>
					<div className={`
                        ${styles.revenyue_profitability_utilization_value} 
                        ${styles[item.color]}`}
					>
						{/* {item.key === 'revenue' ? item.value : `${item.value} %`} */}
						{renderItem(data[item], item)}
					</div>
				</div>
			))}
		</div>
	);
}
export default ServiceStats;
