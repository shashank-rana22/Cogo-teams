import { Placeholder } from '@cogoport/components';
import React from 'react';

import { aArrow } from '../../constants';

import styles from './styles.module.css';

function TotalChatsHandled({ loading = true }) {
	return (
		<div className={styles.total_chats_container}>
			<div className={styles.left_total_chats_container}>
				<div className={styles.label}>Total no. of chats handled</div>
				{loading
					? <Placeholder height="30px" width="50px" className={styles.time_placeholder} />
					: <div className={styles.number}>12</div>}
			</div>
			<div className={styles.right_time_spent_container}>
				<img
					src={aArrow}
					alt="-"
					className={styles.aArrowImg}
				/>
			</div>

		</div>

	);
}
export default TotalChatsHandled;
