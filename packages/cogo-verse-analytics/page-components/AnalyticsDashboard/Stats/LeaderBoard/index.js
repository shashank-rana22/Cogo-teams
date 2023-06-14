import { cl, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import { INTENT_LEADERBOARD, USER_STATUS } from '../../../../configurations/primary-stats';
import { handleValues } from '../../../../utils/handleValues';

import styles from './styles.module.css';

const FOUR = 4;
const ZERO = 0;
const THREE = 3;

function LeaderBoard(props = {}) {
	const {
		stats = {},
		statsLoading = false,
	} = props || {};
	const statsData = stats?.list || {};
	const getAmount = (value) => {
		const amount = formatAmount({
			amount   :	value,
			currency : GLOBAL_CONSTANTS.currency_code.INR,
			options  : {
				currencyDisplay : 'code',
				style           : 'currency',
			},
		});
		return ((amount.substring(FOUR)).split('.'))[ZERO];
	};
	return (
		<div className={styles.user_leaderboard}>

			<div className={styles.leaderboard_stats}>
				{' '}
				<div className={styles.leaderboard_header}>Intent Leaderboard</div>
				{' '}
				<div
					className={INTENT_LEADERBOARD.length > THREE
						? cl`${styles.leaderboard_content} 
                			${styles.inner_shadow}`
						: styles.leaderboard_content}
				>
					{' '}
					{INTENT_LEADERBOARD.map((stat) => {
						const { valueKey, title } = stat;
						return (
							<div className={styles.leaderboard_values} key={stat}>

								<div className={styles.leaderboard_title}>
									{title}
								</div>

								<div className={styles.leaderboard_numbers}>

									<span className={styles.leaderboard_description_number}>

										{!statsLoading
											? getAmount(statsData[valueKey])
											: (
												<Placeholder
													className={styles.placeholder_element}
													height="20px"
													width="30px"
												/>
											)}

									</span>

								</div>

							</div>
						);
					})}
				</div>
				{' '}

			</div>

			<div className={styles.user_status}>
				{USER_STATUS.map((stat) => {
					const { valueKey, title, src } = stat;

					return (
						<div className={styles.user_status_content} key={stat}>
							<div className={styles.user_status_icon}><img src={src} alt={title} /></div>
							<div className={styles.user_status_right}>
								<div className={styles.user_status_num}>
									{
										!statsLoading
											? handleValues(statsData[valueKey] || ZERO)
											: (
												<Placeholder
													className={styles.placeholder_element}
													height="20px"
													width="30px"
												/>
											)
									}

								</div>
								<div className={styles.user_status_text}>{title}</div>
							</div>
						</div>
					);
				})}
			</div>

		</div>
	);
}

export default LeaderBoard;
