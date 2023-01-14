// import { MultiSelect } from '@cogoport/components';
import { Multiselect } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function MultiSelectController(props) {
	const {
		name, control, rules, ...rest
	} = props;
	console.log('am i working>>??', { name, rest });
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, onBlur, value } }) => {
				console.log('render', { name, value });
				return (
					<Multiselect
						{...rest}
						name={name}
						onChange={onChange}
						value={value}
						onBlur={onBlur}
					/>
				);
			}}
		/>
	);
}
export default MultiSelectController;
