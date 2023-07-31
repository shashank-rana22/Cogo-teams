import styles from './styles.module.css';

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
			<div className={styles.header}>
				THIS MONTH
			</div>

			<div className={styles.sub_header}>
				Insights about your attendance
			</div>

			<div className={styles.stats_wrapper}>
				<div className={styles.stats_header}>
					Attendance Stats
				</div>

				<div className={styles.gradient_lines} style={{ width: '100%' }}>
					<div className={styles.line_1} style={{ width: getWidth(PRESENT_DAYS) }} />
					<div className={styles.line_2} style={{ width: getWidth(ABSENT_DAYS) }} />
					<div className={styles.line_3} style={{ width: getWidth(LEAVES) }} />
					<div className={styles.line_4} style={{ width: getWidth(WEEK_OFF) }} />

				</div>
			</div>
		</div>
	);
}

export default AttendanceStats;
