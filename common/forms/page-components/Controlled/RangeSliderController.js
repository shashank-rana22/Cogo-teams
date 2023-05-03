import { RangeSlider } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function RangeSliderController(props) {
	const {
		name, control, value, rules, min, max, sliderWidth, ...rest
	} = props;

	return (
		<Controller
			key={name}
			control={control}
			name={name}
			defaultValue={value}
			rules={rules}
			render={({ field: { onChange, value: newValue } }) => (
				<RangeSlider
					{...rest}
					id={name}
					key={rest.id}
					valueData={newValue || [0, 100]}
					onChange={onChange}
					min={min || 0}
					max={max || 100}
					sliderWidth={sliderWidth || 200}
				/>
			)}
		/>
	);
}

export default RangeSliderController;
