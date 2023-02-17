import { Textarea } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function TextareaController(props) {
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
				<Textarea
					{...rest}
					id={name}
					key={name}
					onChange={onChange}
					value={value}
					onBlur={onBlur}
				/>
			)}
		/>
	);
}
export default TextareaController;
