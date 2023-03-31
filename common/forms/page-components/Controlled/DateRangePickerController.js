import { DateRangepicker } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function DateRangePickerController(props) {
	const {
		name, control, rules, ...rest
	} = props;

	return (
		<Controller
			key={rest.id}
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, value } }) => (
				<DateRangepicker
					{...rest}
					key={rest.id}
					onChange={onChange}
					value={value}
				/>
			)}
		/>
	);
}
export default DateRangePickerController;
