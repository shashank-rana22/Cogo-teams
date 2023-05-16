import { RadioGroup } from '@cogoport/components';
import { Controller } from 'react-hook-form';

function RadioGroupController(props) {
	const {
		name, control, value, rules, ...rest
	} = props;

	return (
		<Controller
			key={rest.id}
			control={control}
			name={name}
			defaultValue={value}
			rules={rules}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<RadioGroup
					{...rest}
					key={rest.id}
					onChange={onChange}
					value={newValue}
					onBlur={onBlur}
				/>
			)}
		/>
	);
}
export default RadioGroupController;
