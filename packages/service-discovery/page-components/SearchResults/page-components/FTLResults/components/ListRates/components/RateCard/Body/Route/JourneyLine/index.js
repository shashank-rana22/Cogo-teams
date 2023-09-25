import convertHourToDay from '../../../../../../../../../utils/convertHourToDay';

import styles from './styles.module.css';

function JourneyLine({
	scheduleData = {},
}) {
	return (
		<span className={styles.journey_line}>
			<span className={styles.circle} />

			<span className={styles.dotted_line} />

			<span className={styles.transit_time}>
				{convertHourToDay(scheduleData?.transit_time)}
			</span>

			<span className={styles.dotted_line} />

			<span className={styles.active_circle} />
		</span>
	);
}

export default JourneyLine;
