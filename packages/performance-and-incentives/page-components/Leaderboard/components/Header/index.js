import { Button, DateRangepicker, Select } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import DURATION_CONSTANTS from '../../../../constants/duration-constants';
import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../../constants/leaderboard-viewtype-constants';
import getEntityOptions from '../../../../utils/get-entity-options';
import {
	getThisAseessYearStartDate,
	getTodayStartDate,
	getThisMonthStartDate,
	getThisQuarterStartDate,
	getLastMonthStartAndEndDates,
	getLastQuarterStartAndEndDates,
} from '../../../../utils/start-date-functions';
import DURATION_OPTIONS from '../../configurations/get-duration-filter-options';

import ProgressBars from './ProgressBars';
import styles from './styles.module.css';

const { TODAY, LAST_MONTH, THIS_MONTH, LAST_QUARTER, THIS_QUARTER, THIS_YEAR, CUSTOM } = DURATION_CONSTANTS;

const { ADMIN, MANAGER, AGENT } = LEADERBOARD_VIEWTYPE_CONSTANTS;

const GET_START_DATE_FUNCTION_MAPPING = {
	[TODAY]        : getTodayStartDate,
	[LAST_MONTH]   : getLastMonthStartAndEndDates,
	[THIS_MONTH]   : getThisMonthStartDate,
	[LAST_QUARTER] : getLastQuarterStartAndEndDates,
	[THIS_QUARTER] : getThisQuarterStartDate,
	[THIS_YEAR]    : getThisAseessYearStartDate,
};

const previousEntries = [LAST_MONTH, LAST_QUARTER];

function Header(props) {
	const { dateRange, setDateRange, entity, setEntity } = props;

	const { push } = useRouter();

	const { user, incentive_leaderboard_viewtype } = useSelector(({ profile }) => profile);

	const [duration, setDuration] = useState('today');

	const onChangeDuration = (selectedDuration) => {
		if (typeof GET_START_DATE_FUNCTION_MAPPING[selectedDuration] === 'function') {
			if (previousEntries.includes(selectedDuration)) {
				const { startDate, endDate } = GET_START_DATE_FUNCTION_MAPPING[selectedDuration]();

				setDateRange({ startDate, endDate });
			} else {
				setDateRange({
					startDate : GET_START_DATE_FUNCTION_MAPPING[selectedDuration](),
					endDate   : new Date(),
				});
			}
		}

		setDuration(selectedDuration);
	};

	return (
		<div className={styles.container}>
			<div className={styles.head_container}>
				<div style={{ width: '100%', marginRight: '20px' }}>

					<div className={styles.user_details_container}>
						<h2>
							Welcome,
							{' '}
							{user.name}
						</h2>
					</div>

					<div className={styles.filter_container}>
						<div>
							You are viewing dashboard
							{' '}
							<span className={styles.light}>for</span>
						</div>

						{incentive_leaderboard_viewtype === ADMIN ? (
							<Select
								value={entity}
								onChange={setEntity}
								options={getEntityOptions()}
								className={styles.entity_selector}
							/>
						) : null}

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

				{[MANAGER, AGENT].includes(incentive_leaderboard_viewtype) && (<ProgressBars />)}

				{incentive_leaderboard_viewtype === ADMIN && (
					<Button
						type="button"
						size="lg"
						style={{ flexShrink: 0, alignSelf: 'flex-end' }}
						themeType="secondary"
						onClick={() => push('/performance-and-incentives/public-leaderboard')}
					>
						Public View Mode
					</Button>
				)}

			</div>

		</div>
	);
}

export default Header;
