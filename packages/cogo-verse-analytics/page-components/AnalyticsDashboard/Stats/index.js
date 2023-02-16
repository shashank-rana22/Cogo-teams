/* eslint-disable max-len */
import React, { useState } from 'react';

import { PRIMARY_STATS } from '../../../configurations/primary-stats';

import { dummy } from './dummy';
import styles from './styles.module.css';

function Stats() {
	const [avgResponseTime, setAvgResponseTime] = useState(2.4);

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

			{/* <div className={styles.bookings_from_container}> */}
			{/* <div className={styles.bookings_from}>
					<div className={styles.bookings_content}>
						<span className={styles.bookings_content_value}>10 </span>
						<span className={styles.bookings_content_content}>bookings </span>
						<span className={styles.bookings_content_static}>from </span>
						<span className={styles.bookings_content_value}>200 </span>
						<span className={styles.bookings_content_content}>Rate Inquiries </span>
					</div>
					<div className={styles.bookings_content}>
						<span className={styles.bookings_content_value}>1.5L </span>
						<span className={styles.bookings_content_content}>revenue </span>
						<span className={styles.bookings_content_static}>from </span>
						<span className={styles.bookings_content_value}>20 </span>
						<span className={styles.bookings_content_content}>invoice payments </span>
					</div>
					<div className={styles.bookings_content}>
						<span className={styles.bookings_content_value}>10 </span>
						<span className={styles.bookings_content_content}>KYC verified </span>
						<span className={styles.bookings_content_static}>from </span>
						<span className={styles.bookings_content_value}>200 </span>
						<span className={styles.bookings_content_content}>new users </span>
					</div>
				</div> */}

			{/* <div className={styles.users_active_on_container}>
					<div className={styles.users_active_on}>
						<div className={styles.active_on}>Users Active on</div>
						<div className={styles.active_on_content}>
							<div className={styles.users_active_on_content_container}>
								<div className={styles.users_active_on_content}>
									CogoVerse AI
								</div>
								<div className={styles.users_active_on_value}>2k</div>
							</div>
							<div className={styles.users_active_on_content_container}>
								<div className={styles.users_active_on_content}>
									Customer Support
								</div>
								<div className={styles.users_active_on_value}>10k</div>
							</div>
						</div>
					</div>
					<div className={styles.tickets_container}>
						<div className={styles.tickets_raised}>
							<span className={styles.tickets_content_value}>20</span>
							<br />
							<span className={styles.tickets_content_content}>Tickets raised</span>
						</div>
						<div className={styles.tickets_resolved}>
							<span className={styles.tickets_content_value}>20</span>
							<br />
							<span className={styles.tickets_content_content}>Tickets resolved</span>
						</div>
					</div>
				</div> */}
			{/* </div> */}

			<div className={styles.leaderboard_container}>
				<div className={styles.intent_leaderboard_container}>
					<div className={styles.intent_leaderboard}>Intent Leaderboard</div>
					<div className={styles.intent_leaderboard_content_container}>
						<div className={styles.leaderboard_content_container}>
							<span className={styles.leaderboard_content}>Normal conversation</span>
							<div className={styles.leaderboard_span_container}>
								<span className={styles.leaderboard_value}>2,40,000 </span>
								<span className={styles.leaderboard_static_data}>users</span>
							</div>
						</div>
						<div className={styles.leaderboard_content_container}>
							<div className={styles.leaderboard_content}>Trade enquiry</div>
							<div className={styles.leaderboard_span_container}>
								<span className={styles.leaderboard_value}>40,000 </span>
								<span className={styles.leaderboard_static_data}>users</span>
							</div>
						</div>
						<div className={styles.leaderboard_content_container_1}>
							<span className={styles.leaderboard_content}>Shipment booking</span>
							<div className={styles.leaderboard_span_container}>
								<span className={styles.leaderboard_value}>4,000 </span>
								<span className={styles.leaderboard_static_data}>users</span>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.user_status_container}>
					{ dummy.map((item) => (
						<div className={styles.user_status}>
							<div className={styles.svg}>
								<img src={item.src} alt="user status" />
							</div>
							<div className={styles.svg_content}>
								<span className={styles.user_status_number}>{item.number}</span>
								<br />
								<span className={styles.user_status_name}>{item.name}</span>
							</div>
						</div>
					))}
				</div>
			</div>
			{/* <div className={styles.response_time_and_communications}>
				<div className={styles.avg_response_time}>
					<div className={styles.static_avg_response_time}>
						Average Customer Response Time
					</div>
					<div className={styles.variable_response_time}>
						<span className={styles.response_time_value}>
							{avgResponseTime}
							{' '}
						</span>
						<span className={styles.response_time_unit}>min</span>
						<span className={styles.arrow_img}>
							{avgResponseTime < 3
								? <img src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/decreasing_arrow.png" alt="decreased" />
								: <img src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/increasing_arrow.svg" alt="increased" />}
						</span>
					</div>
				</div>
				<div className={styles.communications_container}>
					fdgsfd
				</div>
			</div> */}
		</div>
	);
}

export default Stats;
