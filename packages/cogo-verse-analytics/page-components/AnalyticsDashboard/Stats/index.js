/* eslint-disable max-len */
import { cl } from '@cogoport/components';
import { Placeholder } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';
import React, { useEffect } from 'react';

import { PRIMARY_STATS, USER_STATUS, INTENT_LEADERBOARD } from '../../../configurations/primary-stats';
import { imgURL } from '../../../constants/image-urls';
import useGetUsersStats from '../../../hooks/useGetUsersStats';
import { strToKMBT } from '../../../utils/strToKMBT';

import Charts from './LineChart';
import styles from './styles.module.css';

function Stats(props = {}) {
	const { userStats = {}, getUserSats } = useGetUsersStats();

	useEffect(() => {
		getUserSats();
	}, []);

	const {
		statsData = {},
		statsLoading = false,
	} = props || {};

	const intentLeaderboardStats = statsData?.intent_leaderboard_stats || {};

	const getAmount = (value) => {
		const amount = getFormattedPrice(value, 'INR');
		return ((amount.substring(4)).split('.'))[0];
	};

	return (
		<div className={styles.main_container}>
			{/* Header --------------------------------------------------------------------------- */}

			<div className={styles.cogoverse_header}>
				{/* Welcome to the */}
				<img src={imgURL.cogoverse_icon} style={{ marginLeft: '10px' }} alt="Cogoverse Icon" width="18px" />

				<div className={cl`${styles.cogoverse}`}>ogoVerse Analytics!</div>
			</div>

			{/* Primary Stats --------------------------------------------------------------------------- */}

			<div className={styles.primary_stats}>

				<div className={styles.primary_left}>
					{PRIMARY_STATS.map((stat) => {
						const {
							parentKey, valueKey, descKey, title, icon, icon_bg, description,
						} = stat;

						const statValue = statsData[parentKey] || {};

						return (
							<div className={styles.left_stat_content}>
								<div className={styles.primary_left_stat}>

									<div className={styles.primary_stat_title}>
										<div className={styles.primary_stat_value}>

											{!statsLoading
												? strToKMBT(statValue[valueKey] || '0')
												: <Placeholder className={styles.placeholder_element} height="20px" width="25px" />}
										</div>

										{' '}
										{title}
									</div>
									<div className={styles.primary_stat_description}>
										From
										{' '}
										<span>
											{ !statsLoading
												? statValue[descKey] || '0'
												: <Placeholder className={styles.placeholder_element} height="15px" width="20px" />}

										</span>

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
								{!statsLoading
									? strToKMBT(userStats?.ai_chats) : <Placeholder className={styles.placeholder_element} height="15px" width="30px" />}

							</div>
						</div>
						<div className={styles.right_stat_content}>
							<div className={styles.right_stat_label}>
								Customer Support
							</div>
							<div className={styles.right_stat_value}>
								{!statsLoading ? strToKMBT(userStats?.kam_chats)
									: <Placeholder className={styles.placeholder_element} height="15px" width="30px" />}

							</div>
						</div>
					</div>
					<div className={styles.ticket_container}>
						<div className={styles.ticket_details}>

							<div className={styles.ticket_value}>
								{!statsLoading

									? 20
									: <Placeholder className={styles.placeholder_element} height="20px" width="30px" />}

							</div>
							<div className={styles.ticket_label}>
								Tickets
							</div>
							<div className={styles.ticket_label}>
								Raised
							</div>
						</div>
						<div className={styles.vertical_line} />
						<div className={styles.ticket_details}>

							<div className={styles.ticket_value}>
								{
								!statsLoading
									? 15
									: <Placeholder className={styles.placeholder_element} height="20px" width="30px" />
							}

							</div>
							<div className={styles.ticket_label}>
								Tickets
							</div>
							<div className={styles.ticket_label}>
								Resolved
							</div>
						</div>
					</div>
				</div>

			</div>

			{/* Line Chart --------------------------------------------------------------------------- */}

			<div className={styles.line_chart_container}>
				<div className={styles.chart_heading}>
					<div className={styles.chart_heading_content}>Responsive Time Analysis</div>
					<div className={styles.legend_container}>
						<div className={styles.legend_field}>
							<div className={styles.legend_icon_1} />
							<div className={styles.legend_content}>CogoAssist</div>
						</div>
						<div className={styles.legend_field}>
							<div className={styles.legend_icon_2} />
							<div className={styles.legend_content}>Customer support</div>
						</div>
					</div>
				</div>
				<div className={styles.the_chart}>
					<Charts {...props} />
				</div>

			</div>

			{/* Leaderboard --------------------------------------------------------------------------- */}

			<div className={styles.user_leaderboard}>

				{/* INTENT LEADERBOARD */}

				<div className={styles.leaderboard_stats}>
					{' '}
					<div className={styles.leaderboard_header}>Intent Leaderboard</div>
					{' '}
					<div className={INTENT_LEADERBOARD.length > 3 ? cl`${styles.leaderboard_content} ${styles.inner_shadow}` : styles.leaderboard_content}>
						{' '}
						{INTENT_LEADERBOARD.map((stat) => {
							const { valueKey, title, description } = stat;
							return (
								<div className={styles.leaderboard_values}>

									<div className={styles.leaderboard_title}>

										{title}
									</div>

									<div className={styles.leaderboard_numbers}>

										<span className={styles.leaderboard_description_number}>

											{!statsLoading
												? getAmount(intentLeaderboardStats[valueKey])
												: <Placeholder className={styles.placeholder_element} height="20px" width="30px" />}

										</span>

										{description}
									</div>

								</div>
							);
						})}
					</div>
					{' '}

				</div>

				{/* USER STATUS */}
				<div className={styles.user_status}>
					{USER_STATUS.map((stat) => {
						const { value, title, src } = stat;

						return (
							<div className={styles.user_status_content}>
								<div className={styles.user_status_icon}><img src={src} alt={title} /></div>
								<div className={styles.user_status_right}>
									<div className={styles.user_status_num}>
										{
										!statsLoading
											? strToKMBT(value)
											: <Placeholder className={styles.placeholder_element} height="20px" width="30px" />
									}

									</div>
									<div className={styles.user_status_text}>{title}</div>
								</div>
							</div>
						);
					})}
				</div>

			</div>

		</div>
	);
}

export default Stats;
