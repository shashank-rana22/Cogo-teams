import React, { useEffect } from 'react';

import Layout from '../../../../Tasks/TaskExecution/helpers/Layout';

import useCreateCreditNote from './useCreateCreditNote';

function Form({ data, invoiceData, prevData }) {
	const services = data?.services || [];

	const servicesIDs = services?.map((item) => item?.service_id);

	const {
		controls,
		errors,
		handleSubmit,
		onError,
		control,
		customValues,
		onCreate,
		setValue,
	} = useCreateCreditNote({
		services,
		invoice : data,
		servicesIDs,
		isEdit  : true,
		invoiceData,
	});

	const docUrls = [];
	prevData?.document_urls?.forEach((doc) => {
		const file = { name: doc, url: doc };
		docUrls.push(file);
	});

	useEffect(() => {
		setValue('remarks', prevData?.remarks);
		setValue('uploadDocument', docUrls);
	}, []);

	const onSubmit = (values) => {
		onCreate(values);
	};

	console.log({ controls, customValues, control });
	return (
		<Layout
			control={control}
			fields={controls}
			errors={errors}
			customValues={customValues}
			themeType="custom"
		/>
	);
}

export default Form;
