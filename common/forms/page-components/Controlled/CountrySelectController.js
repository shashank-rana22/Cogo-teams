import { Controller } from 'react-hook-form';

import SelectCountryCode from '../Business/SelectCountryCode';

function CountrySelectController({
	name,
	value,
	control,
	...rest
}) {
	return (
		<Controller
			control={control}
			name={name}
			defaultValue={value}
			rules={rest.rules}
			shouldUnregister={rest.shouldUnregister}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<SelectCountryCode
					{...rest}
					onChange={onChange}
					value={newValue}
					onBlur={onBlur}
				/>
			)}
		/>
	);
}
export default CountrySelectController;
