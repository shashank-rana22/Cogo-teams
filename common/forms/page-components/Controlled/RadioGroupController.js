import { RadioGroup } from '@cogoport/components';
import { Controller } from 'react-hook-form';

function RadioGroupController(props) {
	const {
		name, control, rules, value, ...rest
	} = props;

	return (
		<Controller
			key={rest.id}
			control={control}
			name={name}
			rules={rules}
			defaultValue={value}
			render={({ field: { onChange, onBlur, value:newValue } }) => (
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
