import { Select } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function SelectController(props: any) {
	const { name, control, ...rest } = props;

	return (
		<Controller
			key={rest.id}
			control={control}
			name={name}
			rules={rest.rules}
			render={({ field: { onChange, onBlur, value } }) => (
				<Select
					{...rest}
					key={rest.id}
					onChange={onChange}
					value={value}
					onBlur={onBlur}
					data-test-value={value}
				/>
			)}
		/>
	);
}
export default SelectController;
