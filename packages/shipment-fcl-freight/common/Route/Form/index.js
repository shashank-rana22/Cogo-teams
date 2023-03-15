import React from 'react';
import { startCase } from '@cogoport/utils';
// import useUpsell from '@cogo/bookings/ShipmentDetails/hooks/useUpsell';
// import FormElement from '../../../../commons/Layout';
import Footer from '../../Footer';
import styles from './styles.module.css';

const serviceCustomNames = {
	origin_haulage: 'ICD to Port Haulage',
	destination_haulage: 'Port to ICD Haulage',
};

const Form = ({ extraParams, service, onClose, shipment_data, services }) => {
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
	// 		<Text>{`Are you sure you want to add ${startCase(
	// 			`${service?.type} ${service?.service}`,
	// 		)} service?`}</Text>
	// 	);
	// }

	//onSubmit={handleSubmit(addService, onError)}
	//isLoading={loading}
	return (
		<div className={styles.container}>
			<form >
				<div className={styles.form}>
					<div className={styles.heading}>
						{`Add ${startCase(service?.type)} ${
							serviceCustomNames[service?.service_type] ||
							startCase(service?.service_type)
						}`}
					</div>

					{/* {renderForm} */}
				</div>

				<Footer onClose={onClose} />
			</form>
		</div>
	);
};

export default Form;
