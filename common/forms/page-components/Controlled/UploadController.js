import React from 'react';
import { Controller } from 'react-hook-form';

import FileUploader from '../Business/FileUploader';

function UploadController(props) {
	const {
		name, control, rules, ...rest
	} = props;

	return (
		<Controller
			key={rest.id}
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, onBlur, value } }) => {
				console.log('values', value);
				return (
					<FileUploader
						{...rest}
						key={rest.id}
						onChange={onChange}
						value={value}
						onBlur={onBlur}
						data-test-value={value}
					/>
				);
			}}
		/>
	);
}
export default UploadController;
