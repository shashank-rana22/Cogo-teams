import { Checkbox } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function CheckboxController(props) {
	const { name, control, rules, value, ...rest } = props;
	return (
		<Controller
			key={rest.id}
			control={control}
			name={name}
			defaultValue={value}
			rules={rules}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<Checkbox
					{...rest}
					key={rest.id}
					onChange={onChange}
					value={newValue}
					onBlur={onBlur}
				/>
			)}
		/>
	);
}
export default CheckboxController;
