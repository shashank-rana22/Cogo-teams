import getFormattedTime from '../../utils/getFormattedTime';

import styles from './styles.module.css';

const MIN_SECONDS = 0;

const TIME_MAPPING = [
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
	const { time } = getFormattedTime(sec);

	if (!sec) { return sec; }

	return (
		<div className={styles.container}>
			{TIME_MAPPING.map((item) => {
				const { key, label } = item || {};

				if (time[key] === MIN_SECONDS) return null;

				return (
					<span className={styles.state} key={key}>
						{time[key]}
						{label}
					</span>
				);
			})}

		</div>
	);
}

export default DisplayTime;
