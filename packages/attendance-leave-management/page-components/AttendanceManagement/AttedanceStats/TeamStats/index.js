import { cl, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMProfile, IcMTeam } from '@cogoport/icons-react';
import React from 'react';

import { getDecimalValue } from '../../../../utils/getDecimalValue';

import styles from './styles.module.css';

function TeamStats({ teamStats = {}, loading = false }) {
	const { self, team } = teamStats;

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				Monthly Team Stats
			</div>
			{loading ? <Placeholder height="30px" width="100%" margin="0px 0px 20px 0px" /> : (
				<div className={styles.flex_stats1}>
					<div className={styles.avatar_container}>
						<div className={cl`${styles.avatar_icon} ${styles.my_stats}`}>
							<IcMProfile fill="#C26D1A" width={14} height={14} />
						</div>
						Me
					</div>
					<div className={styles.avg_hrs_text}>
						<span className={styles.span_text}>
							Avg hrs/day
						</span>
						<div className={styles.stats_text}>
							{getDecimalValue(self?.avg_work_hrs || GLOBAL_CONSTANTS.zeroth_index)}
						</div>
					</div>
					<div className={styles.arrival_text}>
						<span className={styles.span_text}>
							On Time Arrival
						</span>
						<div className={styles.stats_text}>
							{getDecimalValue(self?.on_time_arrival || GLOBAL_CONSTANTS.zeroth_index)}
							%
						</div>
					</div>
				</div>
			)}
			{loading ? <Placeholder height="30px" width="100%" margin="0px 0px 20px 0px" /> : (
				<div className={styles.team_stats}>
					<div className={styles.avatar_container}>
						<div className={cl`${styles.avatar_icon} ${styles.team_stats_color}`}>
							<IcMTeam fill="#7278AD" width={14} height={14} />
						</div>
						My Team
					</div>
					<div className={styles.team_stats_text}>
						{getDecimalValue(team?.avg_work_hrs || GLOBAL_CONSTANTS.zeroth_index)}
					</div>
					<div className={styles.team_stats_text}>
						{getDecimalValue(team?.on_time_arrival || GLOBAL_CONSTANTS.zeroth_index)}
						%
					</div>
				</div>
			)}

		</div>
	);
}

export default TeamStats;
