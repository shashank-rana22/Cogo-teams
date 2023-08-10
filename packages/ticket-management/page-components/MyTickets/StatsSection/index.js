import { pascalCase } from '@cogoport/utils';

import StatsBody from '../../../common/StatsBody';
import { statsIconsAndData } from '../../../configurations/stats-data';
import useGetTicketStats from '../../../hooks/useGetTicketStats';

import styles from './styles.module.css';

function StatsSection({ spectatorType = '' }) {
	const { statsData = {}, statsLoading = false } = useGetTicketStats({ spectatorType });

	return (
		<div className={styles.stats_section_container}>
			{statsIconsAndData.map((item) => {
				const { label, key } = item;

				const formattedKey = pascalCase(key);
				return (
					<StatsBody
						{...item}
						key={label}
						count={statsData?.[formattedKey]}
						statsLoading={statsLoading}
					/>
				);
			})}
		</div>

	);
}

export default StatsSection;
