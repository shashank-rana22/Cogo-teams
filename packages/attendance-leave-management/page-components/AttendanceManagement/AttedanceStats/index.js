import { Button } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';

import { ATTENDANCE_CONSTANT } from '../../../utils/constants';

import LeaveStats from './LeaveStats';
import styles from './styles.module.css';
import TeamStats from './TeamStats';

const PRESENT_DAYS = 16;
const ABSENT_DAYS = 2;
const LEAVES = 4;
const WEEK_OFF = 8;

const DAYS = 30;
const PERCENTAGE_VALUE = 100;

function AttendanceStats() {
	const getWidth = (item) => `${(item / DAYS) * PERCENTAGE_VALUE}%`;
	return (
		<div>
			<div className={styles.flex}>
				<div>
					<div className={styles.header}>
						THIS MONTH
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
				<div className={styles.flex}>
					<div className={styles.stats_header}>
						Attendance Stats
					</div>
					<div className={styles.present_days}>
						27/31 Days
					</div>
				</div>

				<div className={styles.gradient_lines} style={{ width: '100%' }}>
					<div className={styles.line_1} style={{ width: getWidth(PRESENT_DAYS) }} />
					<div className={styles.line_2} style={{ width: getWidth(ABSENT_DAYS) }} />
					<div className={styles.line_3} style={{ width: getWidth(LEAVES) }} />
					<div className={styles.line_4} style={{ width: getWidth(WEEK_OFF) }} />
				</div>

				<div className={styles.attendance_stats}>
					{ATTENDANCE_CONSTANT.map((val) => (
						<div className={styles.attendance_stats_data} key={val.key}>
							<div className={`${styles.attendance_dot} ${styles[val.colorDot]}`} />
							<span className={styles.span}>{val.label}</span>
							{val.key}
							{' '}
							Days
						</div>
					))}
				</div>
			</div>
			<div className={styles.leave_team_stats}>
				<LeaveStats />
				<TeamStats />
			</div>
		</div>
	);
}

export default AttendanceStats;
