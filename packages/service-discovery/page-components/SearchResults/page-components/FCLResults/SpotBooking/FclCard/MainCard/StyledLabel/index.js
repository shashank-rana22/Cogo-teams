import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import styles from './styles.module.css';

function StyledLabel(props) {
	const { data = {} } = props || {};

	return (
		<div className={styles.schedules}>
			<div className={cl`${styles.transit_time} ${styles.top}`}>
				No of Stops:
				{' '}
				{data.number_of_stops}
			</div>

			<div className={styles.schedule_date}>
				<div className={styles.text}>(ETD)</div>

				<div className={styles.dates}>
					{formatDate({
						date       : data?.departure,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})}
				</div>

				<div className={styles.line} />

				<div className={styles.dates}>
					{formatDate({
						date       : data?.arrival,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})}
				</div>

				<div className={styles.text}>(ETA)</div>
			</div>

			{data?.transit_time ? (
				<div className={cl`${styles.transit_time} ${styles.bottom}`}>
					Transit Time :
					{' '}
					{data?.transit_time}
					{' '}
					Days
				</div>
			) : null}
		</div>
	);
}
export default StyledLabel;
