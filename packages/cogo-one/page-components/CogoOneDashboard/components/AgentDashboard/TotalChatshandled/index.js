import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter, Image } from '@cogoport/next';
import React from 'react';

import { getFormattedNumber } from '../../../../../helpers/getFormattedNumber';
import useListAssignedChats from '../../../hooks/ListAssignedChats';

import styles from './styles.module.css';

const MIN_CHAT_COUNT = 0;

function TotalChatsHandled({ agentId = '' }) {
	const { query } = useRouter();

	const { data = {}, loading = false } = useListAssignedChats({ agentId });

	const { agentName = '', view = '' } = query || {};
	const { chat_stats = {} } = data || {};
	const { close_conversation = 0, active = 0 } = chat_stats || {};

	const totalChatHandle = close_conversation + active;

	return (
		<div className={styles.total_chats_container}>
			<div className={styles.left_total_chats_container}>
				<div className={styles.heading}>
					Total no. of chats handled
					<div className={styles.name}>{ view === 'agent' && `by ${agentName}`}</div>
				</div>
				{loading
					? <Placeholder height="30px" width="90px" className={styles.time_placeholder} />
					: (
						<div className={styles.totalCustomers}>
							{getFormattedNumber(totalChatHandle) || MIN_CHAT_COUNT}
						</div>
					)}
			</div>
			<div className={styles.right_time_spent_container}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.increasing_arrow}
					alt="increasing"
					width={35}
					height={35}
				/>
			</div>
		</div>
	);
}
export default TotalChatsHandled;
