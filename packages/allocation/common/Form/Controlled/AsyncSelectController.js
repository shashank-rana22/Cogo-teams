import { Controller } from '@cogoport/forms';
import React from 'react';

import AsyncSelect from '../components/AsyncSelect';

function AsyncSelectController(props) {
	const {
		name, control, rules, ...rest
	} = props;

	return (
		<Controller
			key={rest.id}
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, onBlur, value } }) => (
				<AsyncSelect
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
export default AsyncSelectController;
