import { Upload } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function UploadController(props: any) {
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
				<Upload
					{...rest}
					key={rest.id}
					onChange={onChange}
					value={value}
					onBlur={onBlur}
					data-test-value={value}
				/>
			)}
		/>
	);
}
export default UploadController;
