import { Datepicker } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function DatepickerController(props) {
	const {
		name, control, rules, value, ...rest
	} = props;

	return (
		<Controller
			key={name}
			control={control}
			name={name}
			rules={rules}
			defaultValue={value}
			render={({ field: { onChange, onBlur, value:newValue } }) => (
				<Datepicker
					disable={rest?.disabled || false}
					{...rest}
					dateFormat={rest?.dateFormat}
					key={name}
					id={name}
					onChange={onChange}
					value={newValue}
					onBlur={onBlur}
					data-test-value={value}
					showTimeSelect={rest?.withTimePicker || false}
				/>
			)}
		/>
	);
}
export default DatepickerController;
