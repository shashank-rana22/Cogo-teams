import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const TIME_FORMAT = 24;
const ONE_MINUTE = 60;
const CHECK_MERIDIEM = 12;
const STRING_LENGTH = 2;

function formatTimeToIST({ timeString, localTime }) {
	const [hours, minutes] = timeString.split(':').map(Number);
	const [localHour, localMinute] = localTime.replace('+', '').split(':').map(Number);

	const ISTHours = (hours + localHour) % TIME_FORMAT;
	const ISTMinutes = (minutes + localMinute) % ONE_MINUTE;
	const period = ISTHours < CHECK_MERIDIEM ? 'AM' : 'PM';
	const ISTHours12 = ISTHours % CHECK_MERIDIEM || CHECK_MERIDIEM;

	return `${ISTHours12.toString().padStart(STRING_LENGTH, '0')}:${ISTMinutes.toString().padStart(STRING_LENGTH, '0')} 
	${period}`;
}

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
					{formatTimeToIST({ timeString: start_time_utc, localTime: local_time_zone })}
					{' '}
					-
					{' '}
					{formatTimeToIST({ timeString: end_time_utc, localTime: local_time_zone })}
				</span>
			</div>
		</div>
	);
}

export default RenderLabel;
