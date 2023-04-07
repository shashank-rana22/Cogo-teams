import { cl } from '@cogoport/components';

import { PromisedConAndContract } from '../../configurations/service-stats-data';

import styles from './styles.module.css';

function ServiceStats({ data }) {
	return (
		<div className={cl`${styles.revenue_profitability_utilisation_section} 
        ${(data === PromisedConAndContract) ? styles.service_stats_ports_section : ''}`}
		>
			{data.map((item) => (
				<div className={styles.individual_section}>
					<div className={styles.revenyue_profitability_utilization_name}>{item.label}</div>
					<div className={`
                        ${styles.revenyue_profitability_utilization_value} 
                        ${styles[item.color]}`}
					>
						{item.value}

					</div>
				</div>
			))}
		</div>
	);
}
export default ServiceStats;
