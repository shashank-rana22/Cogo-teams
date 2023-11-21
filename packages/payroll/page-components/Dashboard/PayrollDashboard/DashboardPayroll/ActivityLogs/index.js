import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { getMonth, getDate } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const MONTHS = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

function ActivityLogs({ data = {} }) {
	const { activity_log } = data || {};
	return (
		<div className={styles.main_container}>
			<span className={styles.heading}>
				Activity Logs
			</span>
			<div className={styles.activity_logs}>
				{(activity_log || []).map((item) => (
					<div className={styles.activity_log_item} key={item?.id}>
						<div className={styles.activity_item}>
							<div>
								<span className={styles.bold_text}>
									{item?.name}
									{' '}
								</span>
								{' '}
								run payroll for
								{' '}
								<span className={styles.bold_text}>

									{MONTHS[getMonth(new Date(item?.approved_on))]}
									{' '}
									01st - 30th
								</span>
							</div>
							<div>
								{MONTHS[getMonth(new Date(item?.approved_on))]}
								{' '}
								{getDate(new Date(item?.approved_on))}
								,
								{' '}
								{formatDate({
									date       : item?.approved_on,
									dateFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
									formatType : 'time',
								})}

							</div>
						</div>
					</div>

				))}
			</div>
		</div>
	);
}

export default ActivityLogs;
