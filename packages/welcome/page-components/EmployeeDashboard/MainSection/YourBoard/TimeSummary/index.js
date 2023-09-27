import { IcCCheckIn, IcCCheckOut, IcMArrowRight } from '@cogoport/icons-react';
import React from 'react';

import useGetCurrentTime from '../../../../../hooks/useGetCurrentTime';

import styles from './styles.module.css';

function TimeSummary() {
	return (
		<div className={styles.container}>
			<div className={styles.current_time}>
				{useGetCurrentTime()}
			</div>
			<div className={styles.today_date}>
				27 Mar 23
			</div>
			<div className={styles.time_log_flex}>
				<div className={styles.time_log}>
					<IcCCheckIn width={20} height={20} style={{ marginRight: 8 }} />
					9.15am
				</div>
				<div className={styles.time_log} style={{ marginLeft: 24 }}>
					<IcCCheckOut width={20} height={20} style={{ marginRight: 8 }} />
					9.15am
				</div>
			</div>
			<div className={styles.checkout}>
				<div className={styles.checkout_text}>
					Check Out
					{' '}
				</div>
				<IcMArrowRight />
			</div>
		</div>
	);
}

export default TimeSummary;
