import { Placeholder } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import { aArrow } from '../../constants';

import styles from './styles.module.css';

function TotalChatsHandled({ loading = true, totalCustomers = '' }) {
	const { query } = useRouter();
	const { agentName = '', view = '' } = query || {};
	return (
		<div className={styles.total_chats_container}>
			<div className={styles.left_total_chats_container}>
				<div className={styles.label}>
					Total no. of chats handled
					{' '}
					<b>{ view === 'agent' && `by ${agentName}`}</b>
				</div>
				{loading
					? <Placeholder height="30px" width="50px" className={styles.time_placeholder} />
					: <div className={styles.number}>{totalCustomers || 0}</div>}
			</div>
			<div className={styles.right_time_spent_container}>
				<img src={aArrow} alt="increasing" className={styles.a_ArrowImg} />
			</div>
		</div>
	);
}
export default TotalChatsHandled;
