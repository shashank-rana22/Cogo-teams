/* eslint-disable max-len */
import React from 'react';

import { PRIMARY_STATS } from '../../../configurations/primary-stats';

import styles from './styles.module.css';

function Stats() {
	return (
		<div className={styles.main_container}>
			<div className={styles.cogoverse_header}>
				Welcome to the
				{' '}
				<span>CogoVerse!</span>
			</div>

			<div className={styles.primary_stats}>

				<div className={styles.primary_left}>
					{PRIMARY_STATS.map((stat) => {
						const { value, title, users, icon, icon_bg, description } = stat;

						return (
							<div className={styles.left_stat_content}>
								<div className={styles.primary_left_stat}>

									<div className={styles.primary_stat_title}>
										<span>{value}</span>
										{' '}
										{title}
									</div>
									<div className={styles.primary_stat_description}>
										From
										{' '}
										<span>{users}</span>
										{' '}
										{description}
									</div>
								</div>
								<div className={styles.primary_left_icon} style={{ background: icon_bg }}>
									{icon}
								</div>
							</div>
						);
					})}
				</div>

				<div className={styles.primary_right}>
					<div className={styles.active_users}>
						<div className={styles.right_stat_title}>Users Active on</div>
						<div className={styles.right_stat_content}>
							<div className={styles.right_stat_label}>
								CogoVerse AI
							</div>
							<div className={styles.right_stat_value}>
								2K
							</div>
						</div>
						<div className={styles.right_stat_content}>
							<div className={styles.right_stat_label}>
								Customer Support
							</div>
							<div className={styles.right_stat_value}>
								20K
							</div>
						</div>
					</div>
					<div className={styles.ticket_container}>
						<div className={styles.ticket_details}>

							<div className={styles.ticket_value}>
								20
							</div>
							<div className={styles.ticket_label}>
								Tickets Raised
							</div>
						</div>
						<div className={styles.vertical_line} />
						<div className={styles.ticket_details}>

							<div className={styles.ticket_value}>
								15
							</div>
							<div className={styles.ticket_label}>
								Tickets Resolved
							</div>
						</div>
					</div>
				</div>

			</div>

		</div>
	);
}

export default Stats;
