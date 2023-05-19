import { Button } from '@cogoport/components';
import React, { useEffect, useState } from 'react';

import Layout from '../../../../../../../Tasks/TaskExecution/helpers/Layout';

import styles from './styles.module.css';
import useCreateCreditNoteHelper from './useCreateCreditNoteHelper';

function Form({
	invoice = {},
	setShow = () => {},
	refetchCN = () => {},
	invoiceData = {},
}) {
	const [servicesIDs, setServicesIDs] = useState([]);

	const services = invoice?.services || [];

	useEffect(() => {
		const servicesID = [];
		invoice?.services?.forEach((service) => {
			servicesID.push(service?.service_id);
		});

		setServicesIDs(servicesID);
	}, []);

	const {
		controls,
		errors,
		control,
		defaultValues,
	} = useCreateCreditNoteHelper({
		setShow,
		services,
		invoice,
		servicesIDs,
		refetchCN,
		invoiceData,
	});

	const onSubmit = (data) => {
		// onCreate(data);
	};

	return (
		<div className={styles.container}>
			<Layout
				control={control}
				fields={controls}
				errors={errors}
				customValues={defaultValues}
			/>

		</div>
	);
}
export default Form;
