import React from 'react';
import { Controller } from 'react-hook-form';

import DepartureDateSelect from './DepartureDateSelect';

function DepartureDateSelectController(props) {
	const { name, control, rules, ...rest } = props;
	return (
		<Controller
			key={name}
			control={control}
			name={name}
			rules={rest.rules}
			shouldUnregister={rest.shouldUnregister}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<DepartureDateSelect
					{...rest}
					key={name}
					onChange={onChange}
					value={newValue}
					onBlur={onBlur}
				/>
			)}
		/>
	);
}
export default DepartureDateSelectController;
