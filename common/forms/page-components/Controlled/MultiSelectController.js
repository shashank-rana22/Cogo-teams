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
<<<<<<< HEAD
					key={name}
					onChange={onChange}
=======
					key={rest.id}
					onChange={(val) => onChange(val)}
>>>>>>> 413bdc718f278499d8ed8cd97b0845b086f58185
					value={value}
					onBlur={onBlur}
					data-test-value={value}
				/>
			)}
		/>
	);
}
export default MultiSelectController;
