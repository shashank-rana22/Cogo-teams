import { startCase } from '@cogoport/utils';
import React from 'react';

import ServiceUpsellControls from '../../helpers/service-upsell-controls';
import Footer from '../Footer';
import Layout from '../Layout';

import styles from './styles.module.css';

function Form({ service, onClose, shipmentData, services, primary_service }) {
	const { controls, formProps } = ServiceUpsellControls({ service, services });

	return (
		<div className={styles.container}>
			<div>
				<div className={styles.form}>
					{`${startCase(primary_service?.trade_type)} ${startCase(service?.service)}`}
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
