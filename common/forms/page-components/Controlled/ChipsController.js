import { Chips } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function ChipsController(props) {
	const {
		name, control, options, rules, multiple, value, ...rest
	} = props;

	return (
		<Controller
			key={rest.id}
			control={control}
			name={name}
			defaultValue={value}
			rules={rules}
			render={({ field: { onChange, value: newValue } }) => (
				<Chips
					{...rest}
					key={rest.id}
					items={options.map((option) => ({
						...option,
						key      : option.key || option.value,
						children : option.children || option.label,
						value    : undefined,
						label    : undefined,
					}))}
					selectedItems={newValue}
					onItemChange={onChange}
					enableMultiSelect={multiple}
				/>
			)}
		/>
	);
}
export default ChipsController;
