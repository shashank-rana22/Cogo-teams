import { Button, RadioGroup, SingleDateRange } from '@cogoport/components';
import React, { useEffect } from 'react';

import getDateRangeFilterMapping from '../../../../../../../constants/getDateRangeFilterMapping';
import { DATES_MAPPING } from '../../../../../../../utils/datesMapping';

import styles from './styles.module.css';

function DatesContentFilter({
	applyFilters = () => {},
	setOpen = () => {},
	date = {},
	setDate = () => {},
	range = '',
	setRange = () => {},
}) {
	const dateRanges = getDateRangeFilterMapping();

	const handleClick = () => {
		applyFilters();
		setOpen(false);
	};

	useEffect(() => {
		const minMax = DATES_MAPPING[range]?.(new Date());
		setDate({ ...minMax });
	}, [range, setDate]);

	const handleReset = () => {
		setRange('today');
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>
					Filters
				</div>
				{range !== 'today' ? (
					<Button
						themeType="tertiary"
						onClick={handleReset}
					>
						Reset
					</Button>
				) : null}

			</div>

			<div className={styles.child_container}>
				<div className={styles.radio_container}>
					<RadioGroup
						options={dateRanges}
						value={range}
						onChange={setRange}
					/>
				</div>

				{range === 'custom' ? (
					<div>
						<SingleDateRange
							value={date}
							isPreviousDaysAllowed
							onChange={setDate}
							maxDate={new Date()}
							placeholder="Select Date Range"
						/>
					</div>
				) : null}
			</div>
			<div className={styles.button_wrap}>
				<Button
					themeType="tertiary"
					className={styles.cancel_btn}
					onClick={() => setOpen(false)}
				>
					CANCEL
				</Button>

				<Button
					themeType="accent"
					onClick={handleClick}
					className={styles.apply_btn}
				>
					APPLY
				</Button>
			</div>
		</div>
	);
}
export default DatesContentFilter;
