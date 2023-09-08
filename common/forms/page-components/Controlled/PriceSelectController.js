import { Controller } from 'react-hook-form';

import PriceSelect from '../Business/PriceSelect';

function PriceSelectController(props) {
	const {
		key = '',
		name = '',
		value = {},
		control,
		priceSelectRef,
		...rest
	} = props;

	return (
		<Controller
			key={key}
			control={control}
			name={name}
			defaultValue={value}
			rules={rest.rules}
			shouldUnregister={rest.shouldUnregister}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<PriceSelect
					priceSelectRef={priceSelectRef}
					{...rest}
					key={key}
					name={name}
					onChange={onChange}
					value={newValue}
					onBlur={onBlur}
					control={control}
				/>
			)}
		/>
	);
}
export default PriceSelectController;
