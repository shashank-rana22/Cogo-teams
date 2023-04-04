import { CreatableSelect } from '@cogoport/components';
import { Controller } from 'react-hook-form';

function CreatableSelectController(props) {
	const {
		name, control, rules, ...rest
	} = props;

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, onBlur, value } }) => (
				<CreatableSelect
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

export default CreatableSelectController;
