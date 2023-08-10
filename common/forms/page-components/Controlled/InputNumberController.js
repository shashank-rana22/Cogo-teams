import { InputNumber } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function InputNumberController(props) {
	const {
		name, control, value, rules, arrow, ...rest
	} = props;

	return (
		<Controller
			key={name}
			control={control}
			name={name}
			defaultValue={value}
			rules={rules}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<InputNumber
					{...rest}
					id={name}
					key={rest.id}
					onChange={onChange}
					value={newValue || ''}
					arrow={arrow}
					onBlur={(event) => {
						onBlur(event);
						if (typeof rest?.onBlur === 'function') {
							rest?.onBlur(event);
						}
					}}
				/>
			)}
		/>
	);
}
export default InputNumberController;
