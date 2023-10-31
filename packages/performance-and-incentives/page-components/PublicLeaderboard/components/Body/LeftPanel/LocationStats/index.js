import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import styles from './styles.module.css';

const LOCATION_STATS_KEYS = { total: 'Total', average: 'Average', agents: 'Agents' };

function LocationStats({
	location_name = 'Mumbai', is_winner = true, location_score_stats = {
		total   : 25000,
		average : 2000,
		agents  : 114,
	},
}) {
	return (
		<div className={styles.container}>
			{is_winner
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
					{location_name}
				</div>
				<div className={cl`${styles.location__data_stats} ${is_winner && styles.location__data_stats_winner}`}>
					{Object.keys(LOCATION_STATS_KEYS).map((key) => (
						<div key={key}>
							{LOCATION_STATS_KEYS[key]}
							:
							{' '}
							<span className={styles.location__data_stats_count}>{location_score_stats?.[key]}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default LocationStats;
