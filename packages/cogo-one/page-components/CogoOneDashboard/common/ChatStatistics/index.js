import { Placeholder, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React from 'react';

import { CHAT_STATS_DATA } from '../../constants';

import styles from './styles.module.css';

function ChatStatistics({ isAdminView = false, loading = false, statusOfChats = {} }) {
	return (
		<>
			{CHAT_STATS_DATA.map((item) => {
				const { label = '', percentage, isAgent, key } = item;

				return (
					(isAdminView || isAgent) && (
						<div
							key={key}
							className={cl`${styles.chatstatistics_box} 
							${isAdminView ? '' : styles.chatstatistics_box_agent}`}
						>
							<div className={styles.chatstatistics_type}>{label}</div>
							{loading
								? <Placeholder height="40px" width="123px" className={styles.placeholder} />
								: (
									<div className={styles.small_data_box}>
										<div className={styles.chat_numbers}>
											{statusOfChats[key]
										|| GLOBAL_CONSTANTS.zeroth_index}

										</div>
										<div
											className={cl`${styles.percentage} 
											${percentage < GLOBAL_CONSTANTS.zeroth_index ? styles.negative
												: styles.positive}`}
										>
											{statusOfChats[percentage] || GLOBAL_CONSTANTS.zeroth_index}
											%
										</div>
										<div className={styles.arrow_icon}>
											<Image
												src={`${percentage < GLOBAL_CONSTANTS.zeroth_index
													? GLOBAL_CONSTANTS.image_url.decreasing_arrow
													: GLOBAL_CONSTANTS.image_url.increasing_arrow}`}
												alt="percentage"
												width={20}
												height={20}
											/>
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
