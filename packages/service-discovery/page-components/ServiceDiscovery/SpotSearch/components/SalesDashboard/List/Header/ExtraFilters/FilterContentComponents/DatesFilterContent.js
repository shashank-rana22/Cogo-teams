import { DateRangePicker, Button, RadioGroup } from '@cogoport/components';
import React, { useEffect } from 'react';

import DateRanges from './date-ranges-filter';
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
	}, [range]);

	return (
		<div className={styles.date_container}>
			<div className={styles.controls}>
				<div>
					<RadioGroup
						options={DateRanges}
						value={range}
						onChange={(item) => {
							setRange(item);
						}}
					/>
				</div>

				{range === 'custom' ? (
					<>
						<div style={{ borderRight: '1px solid #e0e0e0' }} />

						<div
							style={{ padding: '0px 22px 14px 18px' }}
						>
							<DateRangePicker
								value={date}
								onChange={(val) => {
									const { startDate, endDate } = val || {};
									const newStartDate = new Date(startDate);

									newStartDate.setHours(0, 0, 0, 0);

									setDate({
										validity_start_greater_than : newStartDate,
										validity_end_less_than      : endDate,
									});
								}}
								withPopover={false}
								maxDate={new Date()}
							/>
						</div>
					</>
				) : null}
			</div>

			<div
				className={styles.button_wrap}
				style={{
					padding        : '12px 28px 12px 0px',
					display        : 'flex',
					justifyContent : 'flex-end',
				}}
			>
				<Button
					style={{ marginLeft: '14px' }}
					onClick={() => setOpen(false)}
					id="cancel_button"
				>
					CANCEL
				</Button>

				<Button
					onClick={() => handleClick()}
					id="apply_button"
					style={{
						background : '#000000',
						color      : '#ffffff',
						marginLeft : '14px',
					}}
				>
					APPLY
				</Button>
			</div>
		</div>
	);
}
export default DatesFilterContent;
