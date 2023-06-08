import { cl } from '@cogoport/components';

import { statsConversion } from '../../configurations/stats-mapping';

import renderItem from './RenderItem';
import styles from './styles.module.css';

function ServiceStats({ data = {}, source = '', type = 'basic_details', live_contracts = '' }) {
	const STATS_MAPPING = statsConversion({ type: type === 'basic_details' ? 'live_contracts' : 'utilization' });

	return (
		<div className={cl`${styles.revenue_profitability_utilisation_section} 
        ${(source
				=== 'ports-card') ? styles.service_stats_ports_section : ''}`}
		>
			{Object.keys(STATS_MAPPING).map((key) => (
				<div key={key}>
					<div className={styles.revenyue_profitability_utilization_name}>{STATS_MAPPING[key].label}</div>
					<div className={styles.stats_value}>
						{
						renderItem({
							item : STATS_MAPPING[key],
							data : type === 'basic_details' ? { ...data, live_contracts } : data,
						})
					}
					</div>
				</div>
			))}
		</div>
	);
}
export default ServiceStats;
