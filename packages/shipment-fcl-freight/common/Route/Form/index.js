import { startCase } from '@cogoport/utils';
import React from 'react';

// import useUpsell from '@cogoport/bookings/ShipmentDetails/hooks/useUpsell';
// import FormElement from '../../../../commons/Layout';
import Footer from '../../Footer';

import styles from './styles.module.css';

const serviceCustomNames = {
	origin_haulage      : 'ICD to Port Haulage',
	destination_haulage : 'Port to ICD Haulage',
};

function Form({ extraParams, service, onClose, shipmentData, services }) {
	// const {
	// 	controls,
	// 	showElements,
	// 	errors,
	// 	onError,
	// 	addService,
	// 	formProps,
	// 	loading,
	// } = useUpsell({
	// 	service,
	// 	shipment_data,
	// 	extraParams,
	// 	services,
	// });

	// const { fields, formValues, handleSubmit } = formProps;

	// let renderForm = (
	// 	<FormElement
	// 		controls={controls}
	// 		fields={fields}
	// 		errors={errors}
	// 		showElements={showElements}
	// 		formValues={formValues}
	// 	/>
	// );

	// if (!controls.length) {
	// 	renderForm = (
	// 		<Text>
	// 			{`Are you sure you want to add ${startCase(
	// 				`${service?.type} ${service?.service}`,
	// 			)} service?`}

	// 		</Text>
	// 	);
	// }

	return (
		<div className={styles.container}>
			{/* <form onSubmit={handleSubmit(addService, onError)}> */}
			<form>
				<div className={styles.form}>
					FORM
					{/* {renderForm} */}
				</div>

				<Footer onClose={onClose} />
				{/* <Footer onClose={onClose} isLoading={loading} /> */}
			</form>
		</div>
	);
}

export default Form;
