import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import styles from './styles.module.css';

const LOCATION_STATS_KEYS = { total_score: 'Total', average_score: 'Average', total_agent: 'Agents' };

function LocationStats({
	location = {}, rank = 2, additional_stats = {},
}) {
	return (
		<div className={styles.container}>
			{rank === 1
				? (
					<div className={styles.icon_div}>
						<Image
							src={GLOBAL_CONSTANTS.image_url.public_leaderboard_winner_icon}
							alt="winner"
							width={65}
							height={65}
						/>
					</div>
				) : null}
			<div className={styles.location__data}>
				<div className={styles.location__data_heading}>
					Cogoport
					{' '}
					{location?.label}
				</div>
				<div className={cl`${styles.location__data_stats} ${rank === 1 && styles.location__data_stats_winner}`}>
					{Object.keys(LOCATION_STATS_KEYS).map((key) => (
						<div key={key}>
							{LOCATION_STATS_KEYS[key]}
							:
							{' '}
							<span className={styles.location__data_stats_count}>{additional_stats?.[key]}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default LocationStats;
