/* eslint-disable import/no-unresolved */
import { Radio } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function RadioController(props) {
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
				<Radio
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
export default RadioController;
