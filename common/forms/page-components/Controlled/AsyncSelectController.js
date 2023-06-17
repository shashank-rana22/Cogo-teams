import { Controller } from 'react-hook-form';

import AsyncSelect from '../Business/AsyncSelect';

function AsyncSelectController(props) {
	const {
		name, control, rules, value, ...rest
	} = props;

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			defaultValue={value}
			render={({ field: { onChange, value: newValue } }) => (
				<AsyncSelect
					{...rest}
					onChange={(val, obj) => {
						if (typeof rest?.onChange === 'function') {
							rest?.onChange(val, obj);
							onChange(val, obj);
						} else if (typeof rest?.handleChange === 'function') {
							rest?.handleChange(val, obj);
						} else {
							onChange(val, obj);
						}
					}}
					value={newValue || rest?.finalValue}
				/>
			)}
		/>
	);
}
export default AsyncSelectController;
