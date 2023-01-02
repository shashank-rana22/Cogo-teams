import { Pill } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function PillsController(props) {
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
				<Pill
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
export default PillsController;
