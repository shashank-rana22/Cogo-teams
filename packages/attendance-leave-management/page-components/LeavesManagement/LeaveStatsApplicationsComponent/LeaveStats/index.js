import { Placeholder } from '@cogoport/components';
import React from 'react';

import useGetLeaveStats from '../../../../hooks/useGetleaveStats';
import { getDates } from '../../../../utils/getDates';

import styles from './styles.module.css';

const NUM = 1;
function LeaveStats({ cycle_id = '' }) {
	const datesArr = getDates();
	const { data, loading } = useGetLeaveStats(cycle_id);
	const { leave_dates, leave_count } = data || [];
	return (
		<div className={styles.container}>
			{loading ? (
				<Placeholder height="30px" width="100%" margin="0px 0px 20px 0px" />
			) : (
				<div className={styles.header_ctn}>
					<div className={styles.text1}>Leaves Stats</div>
					<div className={styles.text2}>
						{leave_count}
						{' '}
						{leave_count === NUM ? 'Absent' : 'Absents'}
					</div>
				</div>
			)}

			{loading ? (
				<Placeholder height="30px" width="100%" margin="0px 0px 20px 0px" />
			) : (
				<div className={styles.month_styles}>
					{datesArr.map((item) => {
						const isHalfDayAbsent = leave_dates?.some((leaveDate) => leaveDate.day === item
						&& leaveDate.leave_type === 'half_day_absent');
						let dateClass = styles.month_dates;
						if (isHalfDayAbsent) {
							dateClass = styles.half_day_absent;
						} else if (!leave_dates?.some((leaveDate) => leaveDate.day === item)) {
							dateClass = styles.month_dates_absent;
						}

						return (
							<div
								key={item}
								className={dateClass}
							>
								{item}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default LeaveStats;
