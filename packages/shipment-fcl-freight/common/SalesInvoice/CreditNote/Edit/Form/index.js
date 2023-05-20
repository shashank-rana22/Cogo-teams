import React, { useEffect, useMemo } from 'react';

import Layout from '../../../../Tasks/TaskExecution/helpers/Layout';

function Form({
	prevData = {}, controls = [], defaultValues = {}, setValue = () => {}, control = () => {}, errors = {},
}) {
	const docUrls = useMemo(() => {
		const urls = [];
		prevData?.document_urls?.forEach((doc) => {
			const file = { name: doc, url: doc };
			urls.push(file);
		});
		return urls;
	}, [prevData?.document_urls]);

	useEffect(() => {
		setValue('remarks', prevData?.remarks);
		setValue('uploadDocument', docUrls);
	}, [setValue, prevData?.remarks, docUrls]);

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
