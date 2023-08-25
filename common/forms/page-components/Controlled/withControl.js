import React from 'react';
import { useController } from 'react-hook-form';

const withControl =	(Component) => function ControllerComponent({ name, control, value: defaultValue, ...rest }) {
	const {
		field: { onChange, ...controllerRest },
	} = useController({
		name,
		defaultValue,
		control,
		...rest,
	});

	return (
		<Component
			{...rest}
			key={name}
			{...controllerRest}
			onChange={(val, obj) => {
				onChange(val, obj);
				if (typeof rest?.onChange === 'function') {
					rest.handleChange(val, obj);
				}
			}}
		/>
	);
};
export default withControl;
