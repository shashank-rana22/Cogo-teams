import { pascalCase } from '@cogoport/utils';

import StatsBody from '../../../common/StatsBody';
import { statsIconsAndData } from '../../../configurations/stats-data';
import useGetTicketStats from '../../../hooks/useGetTicketStats';

import styles from './styles.module.css';

function StatsSection({ spectatorType = '' }) {
	const { statsData, statsLoading } = useGetTicketStats({ spectatorType });

	return (
		<div className={styles.stats_section_container}>
			{statsIconsAndData.map((item) => {
				const { label, icon, key } = item;

				const formattedKey = pascalCase(key);
				return (
					<StatsBody
						label={label}
						formattedKey={key}
						count={statsData?.[formattedKey]}
						icon={icon}
						key={label}
						statsLoading={statsLoading}
					/>
				);
			})}
		</div>

	);
}

export default StatsSection;
