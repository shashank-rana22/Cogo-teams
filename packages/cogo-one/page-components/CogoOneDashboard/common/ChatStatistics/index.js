import { Placeholder } from '@cogoport/components';
import React from 'react';

import { chatsStatsData } from '../../configurations/dashboard';
import { dArrow, aArrow } from '../../constants';

import styles from './styles.module.css';

function ChatStatistics({ isAdminView = false, loading = false, statusOfChats = {} }) {
	return (
		<>
			{chatsStatsData.map((item) => {
				const { label = '', percentage, isAgent, key } = item;
				return (
					(isAdminView || isAgent) && (
						<div className={`${styles.chatstatistics_box} 
							${isAdminView ? '' : styles.chatstatistics_box_agent}`}
						>
							<div className={styles.text}>{label}</div>
							{loading
								? <Placeholder height="40px" width="123px" className={styles.placeholder} />
								: (
									<div className={styles.small_data_box}>
										<div className={styles.numbers}>{statusOfChats[key] || 0}</div>
										<div
											className={`${styles.percentage} 
											${percentage < 0 ? styles.negative : styles.positive}`}
										>
											{statusOfChats[percentage] || 0}
											%
										</div>
										<div className={styles.arrow_icon}>
											<img src={`${percentage < 0 ? dArrow : aArrow}`} alt="percentage" />
										</div>
									</div>
								)}
						</div>
					)
				);
			})}
		</>
	);
}
export default ChatStatistics;
