import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';
import useGetUserProgress from './useGetUserProgress';

const TARGET_WIDTH = 75;
const INCENTIVE_WIDTH = 25;
const IST_HOUR = 5;
const IST_MIN = 30;

const getProgress = ({ target, points }) => {
	if (points < target) {
		return (points / target) * TARGET_WIDTH;
	}

	return TARGET_WIDTH + (((points - target) / points) * INCENTIVE_WIDTH);
};

const setUTCtoIST = (timestamp) => {
	let dateUTC = new Date(timestamp);
	dateUTC = dateUTC.getTime();

	const dateIST = new Date(dateUTC);
	dateIST.setHours(dateIST.getHours() - IST_HOUR);
	dateIST.setMinutes(dateIST.getMinutes() - IST_MIN);

	return dateIST;
};

function ProgreeBar() {
	const { progressData } = useGetUserProgress();

	const { start_date, end_date, end_point, date_range_points_achieved, date_points_achieved } = progressData || {};

	const END_DATE = setUTCtoIST(end_date);

	const progress = getProgress({ target: end_point, points: date_range_points_achieved });

	if (isEmpty(progressData)) return null;

	return (
		<div className={styles.container}>
			<div>
				<p className={styles.points_till_now}>
					This Month:
					{' '}
					<b>{date_range_points_achieved}</b>
				</p>

				<div className={styles.today_points}>
					Today:
					{' '}
					<b>{date_points_achieved}</b>
				</div>
			</div>

			<div>
				<div className={styles.progress_header}>
					<div className={styles.date}>
						{formatDate({
							date       : start_date,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
							formatType : 'date',
						})}
					</div>

					<div className={styles.heading}>Score</div>

					<div className={styles.date}>
						{formatDate({
							date       : END_DATE,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
							formatType : 'date',
						})}
					</div>
				</div>

				<div className={styles.progress_bar}>
					<Tooltip content={(
						<p>
							Provisional till now:
							{' '}
							<b>{date_range_points_achieved}</b>
						</p>
					)}
					>
						<div
							className={styles.progress}
							style={{
								width      : `${progress}%`,
								background : date_range_points_achieved >= end_point ? '#849e4c' : '#f68b21',
							}}
						/>
						<div className={styles.target_line} />
						<div className={styles.target}>{end_point}</div>
					</Tooltip>
				</div>
			</div>
		</div>
	);
}

export default ProgreeBar;
