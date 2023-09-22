import { Button, DateRangepicker, Select } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import styles from './styles.module.css';

const OFFSET = 1;
const MAX_MONTH = 11;

const DURATION_OPTIONS = [
	{
		label : 'This Month',
		value : 'this_month',
	},
	{
		label : 'This Quarter',
		value : 'this_quarter',
	},
	{
		label : 'This Year',
		value : 'this_year',
	},
	{
		label : 'Custom',
		value : 'custom',
	},
];

const getPreviousMonthDate = () => {
	const currentDate = new Date();
	currentDate.setMonth(currentDate.getMonth() - OFFSET);

	if (currentDate.getMonth() === MAX_MONTH) {
		currentDate.setFullYear(currentDate.getFullYear() - OFFSET);
	}
	return currentDate;
};

function Header() {
	const { push } = useRouter();

	const { user } = useSelector(({ profile }) => profile);

	const [duration, setDuration] = useState('this_month');

	const [dateRange, setDateRange] = useState(null);

	const onChangeDuration = (selectedDuration) => {
		if (selectedDuration === 'this_month') {
			setDateRange({
				startDate : getPreviousMonthDate(),
				endDate   : new Date(),
			});
		} else if (selectedDuration === 'this_quarter') {
			setDateRange({
				startDate : getPreviousMonthDate(),
				endDate   : new Date(),
			});
		} else if (selectedDuration === 'this_year') {
			setDateRange({
				startDate : getPreviousMonthDate(),
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
