import { IcMProfile, IcMTeam } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function TeamStats() {
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				Team Stats
			</div>
			<div className={styles.flex_stats1}>
				<div className={styles.avatar_container}>
					<div className={`${styles.avatar_icon} ${styles.my_stats}`}>
						<IcMProfile fill="#C26D1A" width={14} height={14} />
					</div>
					Me
				</div>
				<div className={styles.avg_hrs_text}>
					<span className={styles.span_text}>
						Avg hrs/day
					</span>
					<div className={styles.stats_text}>
						9 Hrs
					</div>
				</div>
				<div className={styles.arrival_text}>
					<span className={styles.span_text}>
						On Time Arrival
					</span>
					<div className={styles.stats_text}>
						82%
					</div>
				</div>
			</div>
			<div className={styles.team_stats}>
				<div className={styles.avatar_container}>
					<div className={`${styles.avatar_icon} ${styles.team_stats_color}`}>
						<IcMTeam fill="#7278AD" width={14} height={14} />
					</div>
					My Team
				</div>
				<div className={styles.team_stats_text}>
					9 Hrs
				</div>
				<div className={styles.team_stats_text}>
					82%
				</div>
			</div>
		</div>
	);
}

export default TeamStats;
