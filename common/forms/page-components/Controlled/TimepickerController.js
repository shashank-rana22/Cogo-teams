import { Timepicker } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function TimepickerController(props) {
	const {
		name, control, rules, ...rest
	} = props;

	return (
		<Controller
			key={rest.id}
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, onBlur, value } }) => (
				<Timepicker
					{...rest}
					key={rest.id}
					onChange={(val) => {
						if (typeof rest?.onChange === 'function') {
							rest?.onChange(val, name);
						}
						onChange(val);
					}}
					value={value}
					onBlur={onBlur}
					data-test-value={value}
				/>
			)}
		/>
	);
}
export default TimepickerController;
