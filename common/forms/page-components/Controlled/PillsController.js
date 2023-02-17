import { Pill } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function PillsController(props) {
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
				<Pill
					{...rest}
					key={name}
					id={name}
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
