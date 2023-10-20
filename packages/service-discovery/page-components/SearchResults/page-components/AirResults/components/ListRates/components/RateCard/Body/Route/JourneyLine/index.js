import { cl } from '@cogoport/components';

import convertMinutesToHoursOrDays from '../../../../../../../../../utils/convertMinutesToHoursOrDays';

import styles from './styles.module.css';

function JourneyLine({
	scheduleData = {},
}) {
	return (
		<div className={styles.container}>
			<span className={styles.journey_line}>
				<span className={styles.circle} />

				<span className={styles.dotted_line} />

				<div className={styles.tags_container}>
					<span className={cl`${styles.tag} ${styles.transit_time}`}>
						{convertMinutesToHoursOrDays(scheduleData?.transit_time)}
					</span>

					<span className={cl`${styles.tag} ${styles.schedule}`}>
						Schedule
						{['fake', 'predicted'].includes(scheduleData?.schedule_source)
							? ' - Estimated'
							: null}
					</span>
				</div>

				<span className={styles.dotted_line} />

				<span className={styles.active_circle} />
			</span>

		</div>
	);
}

export default JourneyLine;
