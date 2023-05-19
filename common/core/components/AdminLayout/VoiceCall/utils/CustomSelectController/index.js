import { Select } from '@cogoport/components';
import { Controller } from '@cogoport/forms';

function CustomSelectController(props) {
	const {
		name, control, rules, value, ...rest
	} = props;

	return (
		<Controller
			key={name}
			control={control}
			name={name}
			defaultValue={value}
			rules={rules}
			render={({ field: { onChange, onBlur, value : newValue } }) => (
				<Select
					{...rest}
					key={`${name}_${newValue}`}
					id={name}
					onChange={(val, obj) => {
						onChange(val, obj);
						if (rest.handleChange) {
							rest.handleChange(obj, name);
						}
					}}
					value={newValue}
					onBlur={onBlur}
					data-test-value={value}
				/>
			)}
		/>
	);
}
export default CustomSelectController;
