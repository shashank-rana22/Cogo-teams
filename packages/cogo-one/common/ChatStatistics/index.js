import React from 'react';

import { chatsStatsDummyData } from '../../configurations/chats-statistics-dummny-data';

import styles from './styles.module.css';

function ChatStatistics() {
	return (
		<>
			{chatsStatsDummyData.map((item) => {
				const { label, image, number, percentage } = item;
				return (
					<div className={styles.chatstatistics_box}>
						<div className={styles.text}>{label}</div>
						<div className={styles.small_data_box}>
							<div className={styles.numbers}>{number}</div>
							<div className={styles.percentage}>{percentage}</div>
							<div className={styles.d_arrow_icon}>{image}</div>
						</div>

					</div>
				);
			})}

		</>

	);
}

export default ChatStatistics;
