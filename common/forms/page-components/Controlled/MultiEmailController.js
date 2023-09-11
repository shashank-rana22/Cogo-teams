import React from 'react';
import { Controller } from 'react-hook-form';

import MultiEmailInput from '../Business/MultiEmailInput';

function MultiEmailController(props) {
	const {
		itemKey,
		name,
		value,
		control,
		...rest
	} = props;

	return (
		<Controller
			key={itemKey}
			control={control}
			name={name}
			defaultValue={value}
			rules={rest.rules}
			shouldUnregister={rest.shouldUnregister}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<MultiEmailInput
					{...rest}
					key={itemKey}
					onChange={onChange}
					value={newValue}
					onBlur={onBlur}
				/>
			)}
		/>
	);
}
export default MultiEmailController;
