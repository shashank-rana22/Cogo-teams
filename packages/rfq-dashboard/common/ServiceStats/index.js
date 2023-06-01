import { cl } from '@cogoport/components';

import { STATS_MAPPING } from '../../configurations/stats-mapping';

import RenderItem from './RenderItem';
import styles from './styles.module.css';

function ServiceStats({ data = [], source = '' }) {
	return (
		<div className={cl`${styles.revenue_profitability_utilisation_section} 
        ${(source
				=== 'ports-card') ? styles.service_stats_ports_section : ''}`}
		>
			{Object.keys(STATS_MAPPING).map((key) => (
				<div key={key}>
					<div className={styles.revenyue_profitability_utilization_name}>{STATS_MAPPING[key].label}</div>
					<div className={styles.stats_value}>
						<RenderItem item={STATS_MAPPING[key]} data={data} />
					</div>
				</div>
			))}
		</div>
	);
}
export default ServiceStats;
