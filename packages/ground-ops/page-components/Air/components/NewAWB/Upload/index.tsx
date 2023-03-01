import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import Layout from '../../../commons/Layout';

const controls = [
	{
		name       : 'upload_rate_sheet',
		label      : 'Upload Rate Sheet',
		type       : 'file',
		drag       : true,
		span       : 12,
		maxSize    : '10485760',
		uploadType : 'aws',
		height     : '88',
		uploadIcon : 'ic-upload',
		accept     : '.png,.pdf,.jpg,.jpeg,.doc,.docx,.csv,.xlsx',
		rules      : { required: true },
	},
];
function Upload({ setShowUpload }) {
	const { control, handleSubmit, formState: { errors } } = useForm();
	const onSubmit = (formValues) => {
		console.log('formValues', formValues);
		setShowUpload(null);
	};
	return (
		<div>
			<Layout fields={controls} errors={errors} control={control} />
			<Button onClick={handleSubmit(onSubmit)}>Upload</Button>
		</div>
	);
}

export default Upload;
