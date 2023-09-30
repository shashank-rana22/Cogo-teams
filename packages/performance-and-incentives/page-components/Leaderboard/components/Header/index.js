import { Button, DateRangepicker, Select } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import Announcement from '../../../../common/Announcement';
import DURATION_CONSTANTS from '../../../../constants/duration-constants';
import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../../constants/leaderboard-viewtype-constants';
import getEntityOptions from '../../../../utils/get-entity-options';
import {
	getThisAseessYearStartDate,
	getTodayStartDate,
	getThisMonthStartDate,
	getThisQuarterStartDate,
} from '../../../../utils/start-date-functions';
import DURATION_OPTIONS from '../../configurations/get-duration-filter-options';

import ProgressBar from './ProgressBar';
import styles from './styles.module.css';

const { TODAY, THIS_MONTH, THIS_QUARTER, THIS_YEAR, CUSTOM } = DURATION_CONSTANTS;

const { ADMIN } = LEADERBOARD_VIEWTYPE_CONSTANTS;

const GET_START_DATE_FUNCTION_MAPPING = {
	[TODAY]        : getTodayStartDate,
	[THIS_MONTH]   : getThisMonthStartDate,
	[THIS_QUARTER] : getThisQuarterStartDate,
	[THIS_YEAR]    : getThisAseessYearStartDate,
};

function Header(props) {
	const { dateRange, setDateRange, entity, setEntity } = props;

	const { push } = useRouter();

	const { user, incentive_leaderboard_viewtype } = useSelector(({ profile }) => profile);

	const [duration, setDuration] = useState('today');

	const onChangeDuration = (selectedDuration) => {
		if (typeof GET_START_DATE_FUNCTION_MAPPING[selectedDuration] === 'function') {
			setDateRange({
				startDate : GET_START_DATE_FUNCTION_MAPPING[selectedDuration](),
				endDate   : new Date(),
			});
		}

		setDuration(selectedDuration);
	};

	return (
		<div className={styles.container}>
			<div className={styles.head_container}>
				<div>
					<h2>
						Welcome,
						{' '}
						{user.name}
					</h2>

					<div className={styles.filter_container}>
						<div>
							You are viewing Incentive and Scoring Analytics
							{' '}
							<span className={styles.light}>for</span>
						</div>

						<Select
							value={entity}
							onChange={setEntity}
							options={getEntityOptions()}
							className={styles.entity_selector}
							disabled={incentive_leaderboard_viewtype !== ADMIN}
						/>

						<Select
							value={duration}
							onChange={onChangeDuration}
							options={DURATION_OPTIONS}
							className={styles.period_selector}
						/>

						{duration === CUSTOM && (
							<DateRangepicker
								value={dateRange}
								maxDate={new Date()}
								isPreviousDaysAllowed
								onChange={setDateRange}

							/>
						)}
					</div>
				</div>

				<div>
					{incentive_leaderboard_viewtype !== ADMIN && (<ProgressBar />)}

					{incentive_leaderboard_viewtype === ADMIN && (
						<Button
							type="button"
							size="lg"
							themeType="secondary"
							onClick={() => push('/performance-and-incentives/public-leaderboard')}
						>
							Public View Mode
						</Button>
					)}
				</div>
			</div>
			<Announcement />
		</div>
	);
}

export default Header;
