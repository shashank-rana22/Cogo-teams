import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React from 'react';

import styles from './styles.module.css';

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

function ProgressBar({ progressData = {} }) {
	const { start_date, end_date, end_point, score_achieved_till_now, score_achieved_today } = progressData || {};

	const END_DATE = setUTCtoIST(end_date);

	const progress = getProgress({ target: end_point, points: score_achieved_till_now });

	return (
		<div className={styles.container}>

			<div>
				<div className={styles.progress_header}>
					<div className={styles.date}>
						{start_date ? formatDate({
							date       : start_date,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
							formatType : 'date',
						}) : ''}
					</div>

					<div className={styles.heading}>
						Today:
						{' '}
						<b>{score_achieved_today}</b>

					</div>

					<div className={styles.date}>
						{END_DATE ? formatDate({
							date       : END_DATE,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
							formatType : 'date',
						}) : ''}
					</div>
				</div>

				<div className={styles.progress_bar}>
					<Tooltip content={(
						<p>
							Provisional till now:
							{' '}
							<b>{Math.round(score_achieved_till_now)}</b>
						</p>
					)}
					>
						<div
							className={styles.progress}
							style={{
								width      : `${progress}%`,
								background : score_achieved_till_now >= end_point ? '#ABCD62' : '#f68b21',
							}}
						/>
						<div className={styles.target_line} />
						<div className={styles.target}>{Math.round(end_point)}</div>
					</Tooltip>
				</div>
			</div>
		</div>
	);
}

export default React.memo(ProgressBar);
