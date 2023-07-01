import { Placeholder, Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

function StatsBody({ label, count = 0, icon, formattedKey, statsLoading }) {
	const formattedCount = formattedKey.includes('time') ? `${(Number(count) / 60).toFixed(0)} min` : count;
	return (
		<div className={styles.container}>
			<div className={styles.stats_icon}>{icon}</div>
			{
		statsLoading ? (<Placeholder width="70px" height="18px" className={styles.loading_skeleton} />
		) : (
			<div className={styles.stats_count}>{formattedCount}</div>
		)
			}

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
