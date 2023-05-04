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
					onChange={(val, obj) => {
						if (typeof rest?.onChange === 'function') {
							rest?.onChange(val, obj);
						}
						onChange(val, obj);
					}}
					value={rest?.value || value}
				/>
			)}
		/>
	);
}
export default AsyncSelectController;
