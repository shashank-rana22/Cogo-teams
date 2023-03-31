import { SingleDateRange } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function SingleDateRangeController(props) {
	const {
		name, control, rules, ...rest
	} = props;

	return (
		<Controller
			key={name}
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, value } }) => (
				<SingleDateRange
					{...rest}
					key={name}
					id={name}
					onChange={onChange}
					value={value}
				/>
			)}
		/>
	);
}
export default SingleDateRangeController;
