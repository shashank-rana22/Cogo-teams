import { Controller } from '@cogoport/forms';
import React from 'react';

import SelectDayFrequency from '../components/SelectDayFrequency';

function DayFrequencyController(props) {
	const { name, control, value, ...rest } = props;

	return (
		<Controller
			key={rest.id}
			control={control}
			name={name}
			defaultValue={value}
			rules={rest.rules}
			shouldUnregister={rest.shouldUnregister}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<SelectDayFrequency
					{...rest}
					key={rest.id}
					type="button"
					onChange={onChange}
					value={newValue}
					onBlur={onBlur}
				/>
			)}
		/>
	);
}
export default DayFrequencyController;
