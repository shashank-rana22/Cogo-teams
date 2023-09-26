import { RadioGroup } from '@cogoport/components';
import { Controller } from '@cogoport/forms';
import React from 'react';

function RadioController({ itemKey, name, value, control, theme, ...rest }) {
	const Element = RadioGroup;
	return (
		<Controller
			key={itemKey}
			control={control}
			name={name}
			defaultValue={value}
			rules={rest.rules}
			shouldUnregister={rest.shouldUnregister}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<Element
					{...rest}
					key={itemKey}
					onChange={(val, obj) => {
						onChange(val, obj);
						if (rest.handleChange) {
							rest.handleChange(obj, name);
						}
					}}
					value={newValue}
					onBlur={(event) => {
						onBlur(event);
						rest?.onBlur?.(event);
					}}
					data-test-value={newValue}
				/>
			)}
		/>
	);
}
export default RadioController;
