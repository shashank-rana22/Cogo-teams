import { Select, DateRangepicker } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useState } from 'react';

import DURATION_CONSTANTS from '../../../../constants/duration-constants';
import DURATION_OPTIONS from '../../../Leaderboard/configurations/get-duration-filter-options';
import TEXT_MAPPING from '../../configurations/header-text-mapping';
import onChangeDuration from '../../utils/changeDuration';

import CountDownTimer from './CountDownTimer';
import styles from './styles.module.css';

const { CUSTOM } = DURATION_CONSTANTS;

function Header(props) {
	const { view, dateRange, setDateRange, updatedAt, countdown } = props;

	const [duration, setDuration] = useState('today');

	return (
		<div className={styles.container}>
			<div>
				<h2 className={styles.heading}>Leaderboard</h2>

				<div className={styles.sub_container}>
					<p className={styles.sub_heading}>
						for
						{' '}
						<i>
							<b>{TEXT_MAPPING[view]}</b>

							{' '}
							(
							{view === 'kam_wise' ? 'Individual Contribution' : 'Team Contributions'}
							)

						</i>
					</p>

					<Select
						value={duration}
						onChange={(selectedDuration) => onChangeDuration({
							selectedDuration,
							setDateRange,
							setDuration,
						})}
						options={DURATION_OPTIONS}
						className={styles.period_selector}
					/>

					{duration === CUSTOM && (
						<DateRangepicker
							onChange={setDateRange}
							value={dateRange}
							maxDate={new Date()}
							isPreviousDaysAllowed
						/>
					)}
				</div>
			</div>

			<div>

				<CountDownTimer updatedAt={updatedAt} countdown={countdown} />

				{updatedAt && (
					<p className={styles.last_updated_at}>
						Last updated:
						{' '}
						{formatDate({
							date       : updatedAt,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
							formatType : 'dateTime',
							separator  : '; ',
						})}
					</p>
				)}
			</div>

		</div>
	);
}

export default Header;
