/* eslint-disable max-len */
import React from 'react';

import { STATS } from '../../configurations/dummyStatisticsData';

import styles from './styles.module.css';

function Statistics() {
	return (
		<>
			{STATS.map((item) => {
				const { calls, channel } = item;

				return (
					<div className={styles.statistics}>
						<div className={styles.heading}>
							{calls.config.label}
						</div>
						{/* ---------------- */}
						<div className={styles.time_durations_section}>
							{
							calls.data.map((itm) => (
								<div className={styles.time_durations}>
									<div className={styles.time_durations_header}>{itm.duration}</div>
									<div className={styles.time_durations_text}>{itm.text}</div>
								</div>
							))
						}

						</div>
						{/* ---------------- */}

						<div className={styles.socoal_icons_and_data_list}>
							{
							channel.map((stat) => (
								<div className={styles.socoal_icons_and_data}>
									<div className={styles.social_icons_and_its_name}>

										{stat.icon}

										<div className={styles.social_name}>{ stat.channel}</div>

									</div>
									<div className={styles.customer_nos}>{stat.customer_nos}</div>
								</div>
							))
						}

						</div>

					</div>
				);
			})}

		</>
	);
}
export default Statistics;
