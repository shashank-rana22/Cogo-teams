import { Placeholder, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

const DEFAULT_SECONDS = 60;

function StatsCount({ formattedCount = '', statsLoading = false }) {
	if (statsLoading) {
		return <Placeholder width="70px" height="24px" className={styles.loading_skeleton} />;
	}

	return <div className={styles.stats_count}>{formattedCount}</div>;
}

function StatsBody({ label = '', count = 0, icon = {}, formattedKey = '', statsLoading = false }) {
	const formattedCount = 	formattedKey.includes('time')
		? `${(Number(count) / DEFAULT_SECONDS).toFixed(GLOBAL_CONSTANTS.zeroth_index)} min` : count;

	return (
		<div className={styles.container}>
			<div className={styles.stats_icon}>{icon}</div>
			<StatsCount formattedCount={formattedCount} statsLoading={statsLoading} />

			<Tooltip
				className={styles.stats_label}
				content={label}
				placement="bottom"
			>
				<div className={styles.stats_label}>{label}</div>
			</Tooltip>
		</div>
	);
}

export default StatsBody;
