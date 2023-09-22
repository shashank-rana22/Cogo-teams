import { Button, DateRangepicker, Select } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import getEntityOptions from '../../../../utils/get-entity-options';
import {
	getThisAseessYearStartDate,
	getThisMonthStartDate, getThisQuarterStartDate,
} from '../../../../utils/start-date-functions';
import DURATION_OPTIONS from '../../configurations/get-duration-filter-options';

import styles from './styles.module.css';

const GET_START_DATE_FUNCTION_MAPPING = {
	this_month   : getThisMonthStartDate,
	this_quarter : getThisQuarterStartDate,
	this_year    : getThisAseessYearStartDate,
};

function Header() {
	const { push } = useRouter();

	const { user, partner } = useSelector(({ profile }) => profile);

	const [duration, setDuration] = useState('this_month');

	const [dateRange, setDateRange] = useState(null);

	const [entity, setEntity] = useState(partner.id);

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
		<div className={styles.head_container}>
			<div>
				<h2 className={styles.heading}>
					Welcome,
					{' '}
					{user.name}
				</h2>

				<div className={styles.subheading}>
					<div>
						You are viewing Incentive and Scoring Analytics
						{' '}
						<span className={styles.light}>for</span>
						{' '}
						<i>Cogo India</i>
					</div>

					<div className={styles.filter_container}>
						<Select
							value={duration}
							onChange={onChangeDuration}
							options={DURATION_OPTIONS}
						/>

						{duration === 'custom' && (
							<DateRangepicker
								onChange={setDateRange}
								value={dateRange}
								maxDate={new Date()}
								isPreviousDaysAllowed
							/>
						)}

						<Select
							value={entity}
							onChange={setEntity}
							options={getEntityOptions()}
						/>
					</div>
				</div>
			</div>

			<div className={styles.button_container}>
				<Button
					type="button"
					size="lg"
					themeType="secondary"
					style={{ marginRight: '12px' }}
					onClick={() => push('/performance-and-incentives/public-leaderboard')}
				>
					Public View Mode
				</Button>
			</div>
		</div>
	);
}

export default Header;
