import { startCase } from '@cogoport/utils';
import React from 'react';

import ServiceUpsellControls from '../../helpers/service-upsell-controls';
import Footer from '../Footer';
import Layout from '../Layout';

import styles from './styles.module.css';

const serviceCustomNames = {
	origin_haulage      : 'ICD to Port Haulage',
	destination_haulage : 'Port to ICD Haulage',
};

function Form({ extraParams, service, onClose, shipmentData, services, primary_service }) {
	const { controls, formProps } = ServiceUpsellControls({ service, services });

	console.log(controls, 'controlsss');

	return (
		<div className={styles.container}>
			{/* <form onSubmit={handleSubmit(addService, onError)}> */}
			<div>
				<div className={styles.form}>
					FORM
					<Layout controls={controls} formProps={formProps} />

				</div>

				<Footer
					onClose={onClose}
					formProps={formProps}
					service={service}
					shipmentData={shipmentData}
					services={services}
					primary_service={primary_service}

				/>
			</div>
		</div>
	);
}

export default Form;
