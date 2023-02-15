import { Textarea } from '@cogoport/components';
import { Controller } from '@cogoport/forms';

function TextAreaController(props) {
	const {
		name, control, rules, ...rest
	} = props;

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, onBlur, value } }) => (
				<Textarea
					{...rest}
					name={name}
					onChange={onChange}
					value={value}
					onBlur={onBlur}
				/>
			)}
		/>
	);
}

export default TextAreaController;
