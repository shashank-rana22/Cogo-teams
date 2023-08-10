import { Button, RadioGroup, SingleDateRange } from '@cogoport/components';
import React, { useEffect } from 'react';

import dateRangesFilter from '../../../../../constants/dateRangesFilter';
import { DATES_MAPPING } from '../../../../../utils/datesMapping';

import styles from './styles.module.css';

function DatesFilterContent({
	applyFilters = () => {},
	setOpen = () => {},
	date = {},
	setDate = () => {},
	range = '',
	setRange = () => {},
}) {
	const handleClick = () => {
		applyFilters();
		setOpen(false);
	};

	useEffect(() => {
		const minMax = DATES_MAPPING[range]?.(new Date());
		setDate({ ...minMax });
	}, [range, setDate]);

	const dateRanges = dateRangesFilter();

	return (
		<div className={styles.container}>
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
					/>
				</div>
			) : null}

			<div className={styles.button_wrap}>
				<Button
					className={styles.cancel_btn}
					onClick={() => setOpen(false)}
				>
					CANCEL
				</Button>

				<Button
					onClick={handleClick}
					className={styles.apply_btn}
				>
					APPLY
				</Button>
			</div>
		</div>
	);
}
export default DatesFilterContent;
