import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter, Image } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function TotalChatsHandled({ loading = true, totalCustomers = '' }) {
	const { query } = useRouter();

	const { agentName = '', view = '' } = query || {};

	return (
		<div className={styles.total_chats_container}>
			<div className={styles.left_total_chats_container}>
				<div className={styles.heading}>
					Total no. of chats handled
					<div className={styles.name}>{ view === 'agent' && `by ${agentName}`}</div>
				</div>
				{loading
					? <Placeholder height="30px" width="50px" className={styles.time_placeholder} />
					: <div className={styles.totalCustomers}>{totalCustomers || GLOBAL_CONSTANTS.zeroth_index}</div>}
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
