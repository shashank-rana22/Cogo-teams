import { Controller } from 'react-hook-form';

import MobileNumberSelect from '../Business/SelectMobileNumber';

function MobileNumberSelectController({
	itemKey,
	name,
	value,
	control,
	mobileSelectRef,
	...rest
}) {
	return (
		<Controller
			key={itemKey}
			control={control}
			name={name}
			defaultValue={value}
			rules={rest.rules}
			shouldUnregister={rest.shouldUnregister}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<MobileNumberSelect
					mobileSelectRef={mobileSelectRef}
					{...rest}
					key={itemKey}
					onChange={onChange}
					value={newValue}
					onBlur={onBlur}
				/>
			)}
		/>
	);
}
export default MobileNumberSelectController;
