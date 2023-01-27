import { FileSelect } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function FileSelectController(props) {
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
				<FileSelect
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
export default FileSelectController;
