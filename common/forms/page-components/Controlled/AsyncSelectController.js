import { Controller } from 'react-hook-form';

import AsyncSelect from '../Business/AsyncSelect';

function AsyncSelectController(props) {
	const {
		name, control, rules, ...rest
	} = props;

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, value } }) => (
				<AsyncSelect
					{...rest}
					onChange={onChange}
					value={value}
				/>
			)}
		/>
	);
}
export default AsyncSelectController;
