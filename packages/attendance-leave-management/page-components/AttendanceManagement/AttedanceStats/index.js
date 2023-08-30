import { Button, Placeholder } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import { upperCase } from '@cogoport/utils';

import useGetAttendanceStats from '../../../hooks/useGetAttendanceStats';
// import useGetLeaveBalance from '../../../hooks/useGetLeaveBalance';
import { ATTENDANCE_CONSTANT, ATTENDANCE_STATS_MAPPING } from '../../../utils/constants';

import LeaveStats from './LeaveStats';
import styles from './styles.module.css';
import TeamStats from './TeamStats';

const PERCENTAGE_VALUE = 100;

function AttendanceStats({ selectMonth = {} }) {
	const { value, month } = selectMonth;

	const { data, loading } = useGetAttendanceStats(value);
	// const { leaveData, leaveLoading } = useGetLeaveBalance();

	const { attendance_stats, team_stats = {} } = data || {};

	const { total_days, completed_days } = attendance_stats || {};

	console.log('data AttendanceStats', data);

	const getWidth = (item) => `${(item / total_days) * PERCENTAGE_VALUE}%`;

	return (
		<div>
			<div className={styles.flex}>
				<div className={styles.title}>
					<div className={styles.header}>
						{upperCase(month)}
					</div>
					<div className={styles.sub_header}>
						Insights about your attendance
					</div>
				</div>
				<Button size="md" themeType="linkUi">
					Detailed View
					<IcMArrowNext className={styles.arrow_icon} />
				</Button>
			</div>

			<div className={styles.stats_wrapper}>
				Insights about your attendance
				{loading ? <Placeholder height="20px" width="100%" margin="0px 0px 20px 0px" /> : (
					<div className={styles.flex}>
						<div className={styles.stats_header}>
							Attendance Stats
						</div>
						<div className={styles.present_days}>
							{`${completed_days}/${total_days}`}
							{' '}
							Days
						</div>
					</div>
				) }

				{loading ? <Placeholder height="20px" width="100%" margin="0px 0px 20px 0px" /> : (
					<div className={styles.gradient_lines} style={{ width: '100%' }}>
						{ATTENDANCE_STATS_MAPPING.map((val) => (
							<div
								key={val.key}
								className={styles[val.className]}
								style={{ width: getWidth(attendance_stats?.[val.key]) }}
							/>
						))}
					</div>
				)}

				{loading ? <Placeholder height="20px" width="100%" margin="0px 0px 20px 0px" /> : (
					<div className={styles.attendance_stats}>
						{ATTENDANCE_CONSTANT.map((val) => (
							<div className={styles.attendance_stats_data} key={val.key}>
								<div className={`${styles.attendance_dot} ${styles?.[val.colorDot]}`} />
								<span className={styles.span}>{val.label}</span>
								{attendance_stats?.[val.key]}
								{' '}
								Days
							</div>
						))}
					</div>
				)}
			</div>
			<div className={styles.leave_team_stats}>
				<LeaveStats value={value} />
				<TeamStats teamStats={team_stats} loading={loading} />
			</div>
		</div>
	);
}

export default AttendanceStats;
