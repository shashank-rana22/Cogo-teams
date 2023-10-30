import { Timepicker } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function TimepickerController(props) {
	const {
		name, control, rules, value, ...rest
	} = props;
	return (
		<Controller
			key={rest.id}
			control={control}
			name={name}
			rules={rules}
			defaultValue={value}
			render={({ field: { onChange, onBlur, value:newValue } }) => (
				<Timepicker
					{...rest}
					key={rest.id}
					onChange={onChange}
					value={newValue}
					onBlur={onBlur}
					data-test-value={value}
				/>
			)}
		/>
	);
}
export default TimepickerController;
