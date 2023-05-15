import { useForm } from '@cogoport/forms';
import React, { useEffect } from 'react';

import Layout from '../../../../Tasks/TaskExecution/helpers/Layout';

function Form({
	prevData, controls, defaultValues, setValue, control, errors,
}) {
	const docUrls = [];
	prevData?.document_urls?.forEach((doc) => {
		const file = { name: doc, url: doc };
		docUrls.push(file);
	});

	useEffect(() => {
		setValue('remarks', prevData?.remarks);
		setValue('uploadDocument', docUrls);
	}, []);

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
