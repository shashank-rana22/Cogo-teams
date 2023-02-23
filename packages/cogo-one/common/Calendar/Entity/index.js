import styles from './styles.module.css';

export function CalendarEntity({ calendarData }) {
	return (
		<div className={styles.calendar}>
			{
				calendarData?.map(({ head, text }) => (
					<div className={styles.dateContainer}>
						<div className={styles.dayH1}>
							{head}
						</div>
						<div className={styles.dayH2}>
							{text}
						</div>
					</div>
				))
			}
		</div>
	);
}
