import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import styles from './styles.module.css';

function ChecInCheckOut() {
	const formatToday = formatDate({
		date       : new Date(),
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
		formatType : 'date',
	});

	const formatedTime = formatDate({
		date       : new Date(),
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss aaa'],
		formatType : 'time',
	});

	return (
		<div>
			<div className={styles.header}>
				TODAY,
				{formatToday}
			</div>

			<div className={styles.sub_header}>
				This is your status for the day
			</div>

			<div className={styles.time_container}>
				<div className={styles.arrow_time_wrapper}>
					<div>
						<img
							src={GLOBAL_CONSTANTS.image_url.green_arrow}
							alt="arrow"
						/>
					</div>

					<div className={styles.time_wrapper}>
						9:15am
					</div>
				</div>

				<div className={styles.arrow_time_wrapper}>
					<div>
						<img
							src={GLOBAL_CONSTANTS.image_url.red_arrow}
							alt="arrow"
						/>
					</div>

					<div className={styles.time_wrapper}>
						9:15am
					</div>
				</div>

				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div>
						<div>
							Current Time
						</div>
						<div>
							{formatedTime}
						</div>
					</div>

					<div>
						<div>
							Completed Time
						</div>
						<div>
							{formatedTime}
						</div>
					</div>

				</div>

			</div>
		</div>
	);
}

export default ChecInCheckOut;
