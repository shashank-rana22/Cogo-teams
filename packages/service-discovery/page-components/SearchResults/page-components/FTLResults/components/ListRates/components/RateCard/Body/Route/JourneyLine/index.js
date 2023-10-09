// import convertHourToDay from '../../../../../../../../../utils/convertHourToDay';

import styles from './styles.module.css';

function JourneyLine({
	scheduleData = {},
}) {
	const { transit_time_unit, transit_time = 0 } = scheduleData || {};

	return (
		<span className={styles.journey_line}>
			<span className={styles.circle} />

			<span className={styles.dotted_line} />

			<span className={styles.transit_time}>
				{/* {convertHourToDay(scheduleData?.transit_time)} */}
				{transit_time}
				{' '}
				{transit_time_unit}
			</span>

			<span className={styles.dotted_line} />

			<span className={styles.active_circle} />
		</span>
	);
}

export default JourneyLine;
