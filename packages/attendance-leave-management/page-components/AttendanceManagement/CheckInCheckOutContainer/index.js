import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import CurrentTimeClock from './CurrentTimeClock';
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

				<div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 20 }}>
					<div>
						<div style={{ color: '#4F4F4F', paddingBottom: 2 }}>
							Current Time
						</div>
						<div className={styles.formatted_time}>
							<CurrentTimeClock />
						</div>
					</div>

					<div>
						<div style={{ color: '#4F4F4F', paddingBottom: 2 }}>
							Completed Time
						</div>
						<div className={styles.formatted_time}>
							{formatedTime}
						</div>
					</div>
				</div>

				<div className={styles.button_wrapper}>
					<Button themeType="accent" size="lg">
						Check Out
					</Button>
				</div>

			</div>
		</div>
	);
}

export default ChecInCheckOut;
