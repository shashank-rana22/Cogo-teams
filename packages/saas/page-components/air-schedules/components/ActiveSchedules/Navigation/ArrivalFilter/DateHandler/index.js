import { DateRangepicker } from '@cogoport/components';

import styles from '../styles.module.css';

function DateArrivalHandler({ arrivalDate, setArrivalDate }) {
	return (
		<div className={styles.flex}>
			<DateRangepicker
				value={arrivalDate}
				onChange={setArrivalDate}
				id="active_air_sch_arival_date"
			/>
		</div>
	);
}

export default DateArrivalHandler;
