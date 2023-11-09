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
					isPreviousDaysAllowed
					{...rest}
					key={rest.id}
					onChange={(e) => {
						onChange(e);
						if (typeof rest?.onChange === 'function') {
							rest?.onChange(e);
						}
					}}
					value={value}
				/>
			)}
		/>
	);
}
export default DateRangePickerController;
