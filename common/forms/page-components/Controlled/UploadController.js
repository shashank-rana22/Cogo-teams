import React from 'react';
import { Controller } from 'react-hook-form';

import FileUploader from '../Business/FileUploader';

function UploadController(props) {
	const {
		name, control, rules, value, ...rest
	} = props;

	return (
		<Controller
			key={name}
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, onBlur, value :newValue } }) => (
				<FileUploader
					{...rest}
					key={rest.id}
					id={name}
					defaultValues={value}
					onChange={onChange}
					value={newValue}
					onBlur={onBlur}
					data-test-value={newValue}
				/>
			)}
		/>
	);
}
export default UploadController;
