import { Button, Select, DateRangepicker } from '@cogoport/components';
import { IcMArrowLeft } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import DURATION_CONSTANTS from '../../../../constants/duration-constants';
import {
	getThisAseessYearStartDate, getLastMonthStartAndEndDates, getThisMonthStartDate,
	getThisQuarterStartDate, getTodayStartDate,
	getLastQuarterStartAndEndDates,
} from '../../../../utils/start-date-functions';
import DURATION_OPTIONS from '../../../Leaderboard/configurations/get-duration-filter-options';
import TEXT_MAPPING from '../../configurations/header-text-mapping';
import VIEW_OPTIONS from '../../configurations/view-type-options';

import styles from './styles.module.css';

const { TODAY, LAST_MONTH, THIS_MONTH, LAST_QUARTER, THIS_QUARTER, THIS_YEAR, CUSTOM } = DURATION_CONSTANTS;

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
	const { view, setView, dateRange, setDateRange } = props;

	const router = useRouter();

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
						onChange={onChangeDuration}
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

			<div className={styles.actions_container}>
				<Select value={view} onChange={setView} options={VIEW_OPTIONS} className={styles.view_selector} />

				<Button
					type="button"
					size="lg"
					themeType="secondary"
					onClick={() => router.back()}
					style={{ marginLeft: '12px' }}
				>
					<IcMArrowLeft height={20} width={20} style={{ marginRight: '4px' }} />
					Admin View
				</Button>
			</div>
		</div>
	);
}

export default Header;
