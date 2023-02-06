import { Select, ButtonGroup } from '@cogoport/components';
import React, { useState, useEffect } from 'react';

function SelectDayFrequency({
	value = {},
	onChange,
	...rest
}) {
	const [selectedScheduleType, setSelectedScheduleType] = useState(
		value.schedule_type,
	);

	useEffect(() => {
		setSelectedScheduleType(value.schedule_type);
	}, [value]);

	const days = [
		{ label: 'Monday', value: 1 },
		{ label: 'Tuesday', value: 2 },
		{ label: 'Wednesday', value: 3 },
		{ label: 'Thursday', value: 4 },
		{ label: 'Friday', value: 5 },
		{ label: 'Saturday', value: 6 },
		{ label: 'Sunday', value: 7 },
	];

	const dates = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
		22, 23, 24, 25, 26, 27, 28,
	];

	const onFrequencyChange = (type) => {
		switch (type) {
			case 'daily':
				onChange({
					...value,
					schedule_type  : type,
					days_of_week   : [1, 2, 3, 4, 5, 6, 7],
					dates_of_month : [],
				});
				break;
			case 'weekly':
				onChange({
					...value,
					schedule_type  : type,
					days_of_week   : 1,
					dates_of_month : [],
				});
				break;
			case 'monthly':
				onChange({
					...value,
					schedule_type  : type,
					days_of_week   : [],
					dates_of_month : 1,
				});
				break;
			default:
				break;
		}
	};

	const onDayChange = (day) => {
		onChange({
			...value,
			days_of_week: day,
		});
	};

	const onDateChange = (date) => {
		onChange({
			...value,
			dates_of_month: date,
		});
	};

	const ButtonGroupOptions = [
		{
			children : 'Daily',
			onClick  : () => onFrequencyChange('daily'),
		},
		{
			children : 'Weekly',
			onClick  : () => onFrequencyChange('weekly'),
		},
		{
			children : 'Monthly',
			onClick  : () => onFrequencyChange('monthly'),
		},
	];

	return (
		<div>
			<ButtonGroup size="md" options={ButtonGroupOptions} {...rest} />

			<div style={{ marginTop: '10px' }}>
				{selectedScheduleType === 'weekly'
					? (
						<Select
							placeholder="Select Day"
							options={days}
							onChange={(item) => onDayChange(item)}
							value={value.days_of_week}
							{...rest}
						/>

					)
					: null}

				{selectedScheduleType === 'monthly'
					? (
						<Select
							placeholder="Select Date"
							options={dates.map((item) => ({ label: item, value: item }))}
							onChange={(item) => onDateChange(item)}
							value={value.dates_of_month}
							{...rest}
						/>
					)
					: null}
			</div>
		</div>
	);
}

export default SelectDayFrequency;
