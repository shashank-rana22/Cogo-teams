import { Placeholder } from '@cogoport/components';

import WeekCalendar from '../../WeekCalendar';
import WeekFrequency from '../../WeekFrequency';

import styles from './styles.module.css';

const ZERO = 0;
const ONE = 1;
const TWELVE = 12;
function TimeTable({ item, loading }) {
	const tripType = item?.service_lane_links?.[Number(item?.service_lane_links?.length) - ONE]
		?.location_id === item?.service_lane_links?.[ZERO]?.location_id
		? 'Round Trip'
		: 'One Way';

	const totalTransit = Number(item?.service_lane_links?.[Number(item?.service_lane_links?.length)
         - ONE]?.eta_day_count)
     - Number(item?.service_lane_links?.[ZERO]?.etd_day_count);

	return (
		<div className={styles.container}>
			<div className={styles.frequency}>
				Frequency :
				<div className={styles.data}>
					{loading ? <Placeholder width="200px" height="30px" /> : (
						<WeekFrequency
							dayOfWeek={item?.day_of_week || TWELVE}
							startingDay={
                            Number(item?.service_lane_links?.[ZERO]?.eta_day) - ONE
                        }
						/>
					)}
					{loading ? <Placeholder width="200px" height="30px" /> : (
						<WeekCalendar
							dayOfWeek={item?.day_of_week || TWELVE}
							startingDay={
                            Number(item?.service_lane_links?.[ZERO]?.eta_day) - ONE
                        }
						/>
					)}
				</div>
			</div>

			<div className={styles.transit}>
				Total Transit :
				<div className={styles.data}>
					{loading ? <Placeholder width="200px" /> : (
						<div className={styles.days}>
							{totalTransit}
							{' '}
							Days
						</div>
					)}
					<div className={styles.trip}>{tripType || '---'}</div>
				</div>
			</div>
		</div>
	);
}

export default TimeTable;
