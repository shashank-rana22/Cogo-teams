import { DateRangepicker } from '@cogoport/components';

import styles from '../styles.module.css';

function DateDepartureHandler({ departureDate, setDepartureDate }) {
	return (
		<div className={styles.flex}>
			<DateRangepicker
				value={departureDate}
				onChange={setDepartureDate}
				id="active_air_sch_departure_date"
			/>
		</div>
	);
}

export default DateDepartureHandler;
