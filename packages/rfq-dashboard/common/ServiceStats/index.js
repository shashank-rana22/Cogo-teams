import { cl } from '@cogoport/components';

import styles from './styles.module.css';

function ServiceStats({ data = [], type = '', source = '' }) {
	return (
		<div className={cl`${styles.revenue_profitability_utilisation_section} 
        ${(source
			=== 'ports-card') ? styles.service_stats_ports_section : ''}`}
		>
			{data.map((item) => (
				<div className={cl`${type === 'preview-stats' ? styles.individual_section : ''}`}>
					<div className={styles.revenyue_profitability_utilization_name}>{item.label}</div>
					<div className={`
                        ${styles.revenyue_profitability_utilization_value} 
                        ${styles[item.color]}`}
					>
						{item.key === 'revenue' ? item.value : `${item.value} %`}
					</div>
				</div>
			))}
		</div>
	);
}
export default ServiceStats;
