import { Controller } from 'react-hook-form';

import AsyncSelect from '../SmartComponents/AsyncSelect';

function AsyncSelectController(props) {
	const {
		name, control, rules, value, ...rest
	} = props;

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, value: newValue } }) => (
				<AsyncSelect
					{...rest}
					onChange={onChange}
					value={newValue || value}
				/>
			)}
		/>
	);
}
export default AsyncSelectController;
