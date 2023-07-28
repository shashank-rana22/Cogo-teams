import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import { MY_STATS_DATA } from '../../../constants';
import useListAssignedChats from '../../../hooks/ListAssignedChats';
import useListAgentCheckout from '../../../hooks/useListAgentCheckout';
import useListCallDetails from '../../../hooks/useListCallDetails';
import { getFormattedNumber } from '../../../utils/getFormattedNumber';

import styles from './styles.module.css';

function MyStats({ timeline = '' }) {
	const { data = {}, loading: chatLoading = false } = useListAssignedChats();
	const { shipmentData = {}, shipmentLoading = false } = useListAgentCheckout({ timeline });
	const { callData = {}, callLoading = false } = useListCallDetails({ timeline });

	const { chat_stats : chatStats = {} } = data || {};
	const { active = 0 } = chatStats || {};
	const { total_count = 0 } = shipmentData || {};
	const { total_count: callCount = 0 } = callData || {};

	const formateStatsData = {
		chat_assigned : active,
		no_of_booking : total_count,
		calls_made    : callCount,
	};

	const loading = chatLoading || shipmentLoading || callLoading;

	return (
		<div className={styles.intent_served_box}>
			{MY_STATS_DATA.map((item) => {
				const { label, key } = item;

				return (
					<div className={styles.sub_section} key={key}>
						{loading
							? <Placeholder width="40px" height="21px" className={styles.placeholder} />
							: (
								<div className={styles.served_intent_numbers}>
									{getFormattedNumber(formateStatsData[key])
							|| GLOBAL_CONSTANTS.zeroth_index}
								</div>
							)}
						<div className={styles.intents_served_name}>{label}</div>
					</div>
				);
			})}
		</div>
	);
}
export default MyStats;
