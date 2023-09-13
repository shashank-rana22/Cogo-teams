import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const HOUR_TIME_FORMAT = 12;
const START_TIME_HOUR = 0;

const formatSingleTime = ({ time }) => {
	const [hours, minutes] = time.split(':');
	let midDay = 'AM';
	let formattedHours = parseInt(hours, 10);

	if (formattedHours >= HOUR_TIME_FORMAT) {
		midDay = 'PM';
		if (formattedHours > HOUR_TIME_FORMAT) {
			formattedHours -= HOUR_TIME_FORMAT;
		}
	} else if (formattedHours === START_TIME_HOUR) {
		formattedHours = HOUR_TIME_FORMAT;
	}

	return `${formattedHours}:${minutes} ${midDay}`;
};

function RenderLabel({ item = {} }) {
	const { shift_name = '', start_time_local = '', end_time_local = '' } = item || {};

	return (
		<div className={styles.content}>
			<div className={styles.label}>{startCase(shift_name)}</div>
			<div className={styles.shift_name}>
				Shift :
				{' '}
				<span>
					{formatSingleTime({ time: start_time_local })}
					{' '}
					-
					{' '}
					{formatSingleTime({ time: end_time_local })}
				</span>
			</div>
		</div>
	);
}

export default RenderLabel;
