import { Controller } from '@cogoport/forms';
import React from 'react';

import AsyncSelect from '../components/AsyncSelect';

function AsyncSelectController(props) {
	const {
		name, control, rules, ...rest
	} = props;

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, value } }) => (
				<AsyncSelect
					{...rest}
					onChange={onChange}
					value={value}
					data-test-value={value}
				/>
			)}
		/>
	);
}
export default AsyncSelectController;
