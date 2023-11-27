import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import useCountDown from '../../../hooks/useCountDown';

import styles from './styles.module.css';

function CountDownTimer({ updatedAt = '2023-11-27T11:50:00Z' }) {
	const { countdown } = useCountDown({ updatedAt });

	if (countdown < 0 || Number.isNaN(countdown)) return null;

	const minutes = Math.floor(countdown / 60);
	const seconds = countdown % 60;

	return (
		<div className={styles.container}>
			<div>
				<div> Next Update in</div>
				<div className={styles.last_updated_at}>
					Last updated:
					{' '}
					{formatDate({
						date       : updatedAt,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
						formatType : 'dateTime',
						separator  : '@',
					})}
				</div>
			</div>

			<div className={styles.timer_container}>
				<div className={styles.digit}>{String(minutes).padStart(2, '0')}</div>

				<strong className={styles.divider}>:</strong>

				<div className={styles.digit}>{String(seconds).padStart(2, '0')}</div>
			</div>

		</div>
	);
}

export default CountDownTimer;
