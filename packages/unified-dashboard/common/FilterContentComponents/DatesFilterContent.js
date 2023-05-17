import { Button, RadioGroup, SingleDateRange } from '@cogoport/components';
import React, { useEffect } from 'react';

import DateRanges from '../../constants/date-ranges-filter';

import datesMapping from './dates-mapping';
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
		const min_max = datesMapping(range);
		setDate({ ...min_max });
	}, [range, setDate]);

	return (
		<div>
			<div>
				<div className={styles.radio_container}>
					<RadioGroup
						options={DateRanges}
						value={range}
						onChange={(item) => {
							setRange(item);
						}}
					/>
				</div>

				{range === 'custom' ? (
					<div>
						<SingleDateRange
							value={date}
							isPreviousDaysAllowed
							onChange={(val) => setDate(val)}
							maxDate={new Date()}
						/>
					</div>
				) : null}
			</div>

			<div
				className={styles.button_wrap}

			>
				<Button
					className={styles.cancel_btn}
					onClick={() => setOpen(false)}
				>
					CANCEL
				</Button>

				<Button
					onClick={() => handleClick()}
					className={styles.apply_btn}
				>
					APPLY
				</Button>
			</div>
		</div>
	);
}
export default DatesFilterContent;
