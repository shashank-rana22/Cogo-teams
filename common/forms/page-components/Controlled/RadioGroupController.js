import { RadioGroup } from '@cogoport/components';
import { Controller } from 'react-hook-form';

function RadioGroupController(props) {
	const {
		name, control, rules, ...rest
	} = props;

	return (
		<Controller
			key={rest.id}
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, onBlur, value } }) => (
				<RadioGroup
					{...rest}
					key={rest.id}
					onChange={onChange}
					value={value}
					onBlur={onBlur}
				/>
			)}
		/>
	);
}
export default RadioGroupController;
