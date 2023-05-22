import React, { useEffect, useMemo } from 'react';

import Layout from '../../../../Tasks/TaskExecution/helpers/Layout';

function Form({
	prevData = {},
	controls = [],
	defaultValues = {},
	setValue = () => {},
	control = () => {},
	errors = {},
}) {
	const docUrls = useMemo(() => prevData?.document_urls?.map((doc) => ({
		name: doc, url: doc,
	})), [prevData?.document_urls]);

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
