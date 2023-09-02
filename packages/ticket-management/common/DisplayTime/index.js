import getFormattedTime from '../../utils/getFormattedTime';

import styles from './styles.module.css';

const MIN_SECONDS = 0;
const NULL_RETURN = '0h 0m 0s';
const PAD_START_COUNT = 2;

const TIME_LABEL_MAPPING = [
	{
		key   : 'days',
		label : 'd',
	},
	{
		key   : 'hours',
		label : 'h',
	},
	{
		key   : 'minutes',
		label : 'm',
	},
	{
		key   : 'seconds',
		label : 's',
	},
];

function DisplayTime({ sec = 0 }) {
	const time = getFormattedTime(sec);

	if (!sec || sec === '0') { return NULL_RETURN; }

	return (
		<div className={styles.container}>
			{TIME_LABEL_MAPPING.map((item) => {
				const { key, label } = item || {};

				if (time[key] === MIN_SECONDS) return null;

				return (
					<span className={styles.state} key={key}>
						<span className={styles.count}>{time[key].toString().padStart(PAD_START_COUNT, '0')}</span>
						<span className={styles.label}>{label}</span>
					</span>
				);
			})}

		</div>
	);
}

export default DisplayTime;
