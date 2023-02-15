import { CreatableMultiSelect } from '@cogoport/components';
import { Controller } from '@cogoport/forms';

function CreatableMultiSelectController(props) {
	const {
		name, control, rules, ...rest
	} = props;

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, onBlur, value } }) => (
				<CreatableMultiSelect
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

export default CreatableMultiSelectController;
