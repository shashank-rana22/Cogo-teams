import { MultiSelect } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function MultiSelectController(props) {
	const {
		name, control, rules, ...rest
	} = props;

	return (
		<Controller
			key={name}
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, onBlur, value } }) => (
				<MultiSelect
					{...rest}
					key={rest.id}
					onChange={(val) => onChange(val)}
					value={value}
					onBlur={onBlur}
					data-test-value={value}
				/>
			)}
		/>
	);
}
export default MultiSelectController;
