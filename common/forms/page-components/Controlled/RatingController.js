import { RatingComponent } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function RatingController(props) {
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
			render={({ field: { onChange, value: newValue } }) => (
				<RatingComponent
					{...rest}
					id={name}
					key={rest.id}
					onChange={onChange}
					value={newValue}
				/>
			)}
		/>
	);
}
export default RatingController;
