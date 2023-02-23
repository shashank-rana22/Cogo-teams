import styles from './styles.module.css';

export function CalendarEntity({ selectedItem, setSelectedItem, calendarData }) {
	return (
		<div className={styles.calendar}>
			{
				calendarData?.map(({ label, subLabel, key }) => (
					<div
						key={key}
						onClick={() => setSelectedItem(key)}
						className={`${styles.dateContainer} ${selectedItem === key ? styles.active : ''}`}
					>
						<div className={styles.dayH1}>
							{label}
						</div>
						<div className={styles.dayH2}>
							{subLabel}
						</div>
					</div>
				))
			}
		</div>
	);
}
