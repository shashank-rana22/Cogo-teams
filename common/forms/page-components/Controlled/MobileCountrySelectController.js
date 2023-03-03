import { Controller } from 'react-hook-form';

import SelectMobileCountryCode from '../Business/SelectMobileCountryCode';

function MobileCountrySelectController({
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
				<SelectMobileCountryCode
					{...rest}
					onChange={onChange}
					value={newValue}
					onBlur={onBlur}
				/>
			)}
		/>
	);
}
export default MobileCountrySelectController;
