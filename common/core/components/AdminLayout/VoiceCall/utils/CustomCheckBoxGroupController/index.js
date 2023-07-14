import { Controller } from '@cogoport/forms';

import ActionsType from './ActionsType';

function CustomCheckBoxGroupController(props) {
	const {
		name, control, rules, ...rest
	} = props;

	return (
		<Controller
			key={name}
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, onBlur, value } }) => (
				<ActionsType
					{...rest}
					key={name}
					id={name}
					onChange={onChange}
					value={value}
					onBlur={onBlur}
				/>
			)}
		/>
	);
}
export default CustomCheckBoxGroupController;
