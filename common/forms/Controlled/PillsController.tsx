import { Pills } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function PillsController(props: any) {
	const { name, control, ...rest } = props;

	return (
		<Controller
			key={rest.id}
			control={control}
			name={name}
			rules={rest.rules}
			render={({ field: { onChange, onBlur, value } }) => (
				<Pills
					{...rest}
					key={rest.id}
					onChange={onChange}
					value={value}
					onBlur={onBlur}
					data-test-value={value}
				/>
			)}
		/>
	);
}
export default PillsController;
