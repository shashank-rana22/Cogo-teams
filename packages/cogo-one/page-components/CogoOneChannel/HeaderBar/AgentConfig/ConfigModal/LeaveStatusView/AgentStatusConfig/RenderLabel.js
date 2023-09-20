import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const INDEX_OF_ZONE = 1;
const TOTAL_HOURS = 24;
const TOTAL_MINUTES = 60;
const DEFAULT_TIME = 0;
const HOURS_TO_CHANGE = 1;

export const getDateFromTime = ({
	timeStr = '00:00:00',
	timeZone = '+00:00',
}) => {
	const [hour = 0, minute = 0, seconds = 0] = timeStr.split(':');

	const GMTZone = timeZone.slice(GLOBAL_CONSTANTS.zeroth_index, INDEX_OF_ZONE);
	const timeDifference = timeZone.slice(INDEX_OF_ZONE);
	const [hourDifference, minuteDifference] = timeDifference.split(':');

	const formattedMinute = GMTZone === '+'
		? Number(minute) + Number(minuteDifference)
		: Number(minute) - Number(minuteDifference);

	const formattedHour = (
		(GMTZone === '+'
			? Number(hour) + Number(hourDifference)
			: Number(hour) - Number(hourDifference))
	+ Number(formattedMinute >= TOTAL_MINUTES ? HOURS_TO_CHANGE : DEFAULT_TIME)
	- (formattedMinute < DEFAULT_TIME ? HOURS_TO_CHANGE : DEFAULT_TIME)
	);

	const currentTime = new Date();

	currentTime.setHours(((formattedHour % TOTAL_HOURS) + TOTAL_HOURS) % TOTAL_HOURS);
	currentTime.setMinutes(((formattedMinute % TOTAL_MINUTES) + TOTAL_MINUTES) % TOTAL_MINUTES);
	currentTime.setSeconds(Number(seconds) || DEFAULT_TIME);

	return formatDate({
		date       : currentTime,
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
		formatType : 'time',
	});
};

function RenderLabel({ item = {} }) {
	const {
		shift_name = '', start_time_utc = '', end_time_utc = '', local_time_zone = '',
	} = item || {};

	return (
		<div className={styles.content}>
			<div className={styles.label}>{startCase(shift_name)}</div>
			<div className={styles.shift_name}>
				Shift :
				{' '}
				<span>
					{getDateFromTime({ timeStr: start_time_utc, timeZone: local_time_zone })}
					{' '}
					-
					{' '}
					{getDateFromTime({ timeStr: end_time_utc, timeZone: local_time_zone })}
				</span>
			</div>
		</div>
	);
}

export default RenderLabel;
