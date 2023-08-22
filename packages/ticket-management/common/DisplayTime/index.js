import { useTranslation } from 'next-i18next';

import getFormattedTime from '../../utils/getFormattedTime';

import styles from './styles.module.css';

const MIN_SECONDS = 0;
const NULL_RETURN = '0h 0m 0s';
const PAD_START_COUNT = 2;

const getTimeMapping = (t) => [
	{
		key   : 'days',
		label : `${t('myTickets:days_label')}`,
	},
	{
		key   : 'hours',
		label : `${t('myTickets:hours_label')}`,
	},
	{
		key   : 'minutes',
		label : `${t('myTickets:minutes_label')}`,
	},
	{
		key   : 'seconds',
		label : `${t('myTickets:seconds_label')}`,
	},
];

function DisplayTime({ sec = 0 }) {
	const { t } = useTranslation(['']);

	const time = getFormattedTime(sec);

	if (!sec || sec === '0') { return NULL_RETURN; }

	return (
		<div className={styles.container}>
			{getTimeMapping(t).map((item) => {
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
