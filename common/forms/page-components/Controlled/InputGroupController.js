import React from 'react';
import { Controller } from 'react-hook-form';

import InputGroup from '../Business/InputGroup';

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
					key={rest.id}
					onChange={(val, obj) => {
						onChange(val, obj);
						if (rest.handleChange) {
							rest.handleChange(obj, name);
						}
					}}
					value={newValue || value}
					onBlur={onBlur}
					id={rest.id}
				/>
			)}
		/>
	);
}
export default InputGroupController;
