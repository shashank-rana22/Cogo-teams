import { Placeholder, cl } from '@cogoport/components';
import React from 'react';

import { getFormattedNumber } from '../../../../helpers/getFormattedNumber';
import { CHAT_STATS_DATA } from '../../constants';
import useListAssignedChats from '../../hooks/ListAssignedChats';

import styles from './styles.module.css';

const MIN_CHAT_NUMBER = 0;

function ChatStatistics({ isAdminView = false, agentId = '', timeline = '' }) {
	const { data = {}, loading = false } = useListAssignedChats({ agentId, timeline });

	const { chat_stats : chatStats = {} } = data || {};

	return (
		<>
			{CHAT_STATS_DATA.map((item) => {
				const { label = '', isAgent, key = '' } = item;

				if (!isAdminView && !isAgent) {
					return null;
				}

				return (
					<div
						key={key}
						className={cl`${isAdminView ? styles.chatstatistics_box : styles.agent_view} `}
					>
						<div className={styles.chatstatistics_type}>{label}</div>
						{loading
							? <Placeholder height="40px" width="123px" className={styles.placeholder} />
							: (
								<div className={styles.small_data_box}>
									<div className={styles.chat_numbers}>
										{getFormattedNumber(chatStats?.[key] || MIN_CHAT_NUMBER)}
									</div>
								</div>
							)}
					</div>
				);
			})}
		</>
	);
}
export default ChatStatistics;
