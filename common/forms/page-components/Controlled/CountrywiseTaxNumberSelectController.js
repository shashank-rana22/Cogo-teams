import { Controller } from 'react-hook-form';

import CountrywiseTaxSelect from '../Business/CountrywiseTaxSelect';

function CountrywiseTaxNumberSelectController({
	itemKey,
	name,
	value,
	control,
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
				<CountrywiseTaxSelect
					{...rest}
					key={itemKey}
					itemKey={itemKey}
					onChange={onChange}
					value={newValue}
					onBlur={(e) => {
						onBlur(e);

						if (rest.onBlur) {
							rest.onBlur(e);
						}
					}}
				/>
			)}
		/>
	);
}
export default CountrywiseTaxNumberSelectController;
