import styles from './styles.module.css';

function WeekCalendar({ startingDay }) {
	const week = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

	return (
		<div className={styles.box}>
			{'( '}
			{week?.map((days, index) => (
				<span
					key={days}
					className={
                            index === startingDay ? styles.active_day : null
                        }
				>
					{days}
					{' '}
				</span>
			))}
			{') '}
		</div>
	);
}

export default WeekCalendar;
