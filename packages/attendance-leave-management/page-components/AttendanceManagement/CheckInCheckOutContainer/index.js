/* eslint-disable no-unused-vars */
import { Button, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import useGetCheckinStats from '../../../hooks/useGetCheckinStats';

import CompletedTime from './CompletedTime';
import CurrentTimeClock from './CurrentTimeClock';
import styles from './styles.module.css';

function ChecInCheckOut({ location }) {
	const formatToday = formatDate({
		date       : new Date(),
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
		formatType : 'date',
	});

	// const formatedTime = formatDate({
	// 	date       : new Date(),
	// 	timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss aaa'],
	// 	formatType : 'time',
	// });

	const getTime = (date) => {
		if (!date) {
			return '--';
		}

		return formatDate({
			date,
			timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss aaa'],
			formatType : 'time',
		});
	};

	const { loading, data } = useGetCheckinStats();

	const { check_in, check_out, enable_check_out, lat, long, radius } = data || {};

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
						{loading
							? <Placeholder height="50px" width="100px" margin="0px 0px 20px 0px" /> : getTime(check_in)}
					</div>
				</div>

				<div className={styles.arrow_time_wrapper}>
					<div>
						<img
							src={GLOBAL_CONSTANTS.image_url.red_arrow}
							alt="arrow"
						/>
					</div>

					<div className={styles.time_wrapper_out}>
						{loading
							? <Placeholder height="50px" width="100px" margin="0px 0px 20px 0px" />
							: getTime(check_out) }
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
						{loading
							? <Placeholder height="50px" width="100px" margin="0px 0px 20px 0px" />
							: <CompletedTime checkInTimeStr={check_in} checkOutTimeStr={check_out} />}
					</div>
				</div>

				<div className={styles.button_wrapper}>
					<Button
						themeType="accent"
						size="lg"
						disabled={!enable_check_out}
						onClick={enable_check_out ? () => console.log('click enable') : () => {}}
					>
						Check Out
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ChecInCheckOut;
