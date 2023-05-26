import React, { useEffect } from 'react';

import Layout from '../../../../Tasks/TaskExecution/helpers/Layout';

function Form({
	prevData = {},
	controls = [],
	defaultValues = {},
	setValue = () => { },
	control = () => { },
	errors = {},
}) {
	const { remarks, document_urls } = prevData || {};

	useEffect(() => {
		setValue('remarks', remarks);
		setValue('uploadDocument', document_urls);
	}, [setValue, remarks, document_urls]);

	return (
		<Layout
			control={control}
			fields={controls}
			errors={errors}
			customValues={defaultValues}
		/>
	);
}

export default Form;
