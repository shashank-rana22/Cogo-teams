/* eslint-disable max-len */
import React from 'react';

import { chatsStatsDummyData } from '../../configurations/chats-statistics-dummny-data';
import { dArrow, aArrow } from '../../page-components/CogoOneDashboard/constants';

import styles from './styles.module.css';

function ChatStatistics({ isAdminView }) {
	return (
		<>
			{chatsStatsDummyData.map((item) => {
				const { label, number, percentage, isAgent } = item;
				return (
					(isAdminView || isAgent) && (
						<div className={styles.chatstatistics_box}>
							<div className={styles.text}>{label}</div>
							<div className={styles.small_data_box}>
								<div className={styles.numbers}>{number}</div>
								<div
									className={`${styles.percentage} ${percentage < 0 ? styles.negative : styles.positive}`}
								>
									{percentage}
									%
								</div>
								<div className={styles.arrow_icon}>
									<img src={`${percentage < 0 ? dArrow : aArrow}`} alt="" />
								</div>
							</div>

						</div>
					)
				);
			})}

		</>

	);
}

export default ChatStatistics;
