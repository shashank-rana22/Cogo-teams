import { InputGroup } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function InputGroupController(props) {
	const {
		name, control, value, rules, ...rest
	} = props;

	return (
		<Controller
			key={name}
			control={control}
			name={name}
			defaultValue={value}
			rules={rules}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<InputGroup
					{...rest}
					id={name}
					key={name}
					onChange={onChange}
					value={newValue || ''}
					onBlur={onBlur}
				/>
			)}
		/>
	);
}
export default InputGroupController;
