import StatsStructure from '../../../common/StatsStructure';
import { statsIconsAndData } from '../../../configurations/stats-data';

import styles from './styles.module.css';

function StatsSection() {
	return (
		<div className={styles.stats_section_container}>
			{statsIconsAndData.map((item) => {
				const { label, count, icon, key } = item;
				return (
					<StatsStructure label={label} count={count} icon={icon} key={key} />
				);
			})}
		</div>

	);
}

export default StatsSection;
