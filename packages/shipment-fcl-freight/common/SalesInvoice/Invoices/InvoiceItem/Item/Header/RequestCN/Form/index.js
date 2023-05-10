// import Layout from '@cogo/bookings/commons/Layout';
import Button from '@cogoport/components';
import React, { useEffect, useState } from 'react';

// import useCreateCreditNote from '../../../../../../../../hooks/useCreateCreditNote';
import styles from './styles.module.css';

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

	// const {
	// 	fields,
	// 	errors,
	// 	handleSubmit,
	// 	onCreate,
	// 	onError,
	// 	control,
	// 	customValues,
	// } = useCreateCreditNote({
	// 	setShow,
	// 	services,
	// 	invoice,
	// 	servicesIDs,
	// 	refetchCN,
	// 	invoiceData,
	// });

	const onSubmit = (data) => {
		// onCreate(data);
	};

	return (
		<div className={styles.container}>
			{/* <Layout
				controls={control}
				fields={fields}
				errors={errors}
				customValues={customValues}
				themeType="custom"
			/> */}

			<div className={styles.button_wrap}>
				<Button
					type="button"
					// onClick={handleSubmit(onSubmit, onError)}
				>
					Request
				</Button>
			</div>
		</div>
	);
}
export default Form;
