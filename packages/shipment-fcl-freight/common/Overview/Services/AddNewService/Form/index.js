import { Modal } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useServiceUpsellControls from '../../../../../hooks/useFormatServiceUpsellControls';
import Layout from '../../../../Layout';
import Footer from '../Footer';

import styles from './styles.module.css';

function Form({
	upsellableService,
	servicesList, shipmentData,
	primary_service,
	setUpsellModal,
}) {
	const [truckTypeToggle, setTruckTypeToggle] = useState(false);

	const service = upsellableService.service_type.replace('_service', '');

	const { controls, formProps } = useServiceUpsellControls({
		service,
		services: servicesList,
		truckTypeToggle,
		setTruckTypeToggle,
	});

	return (
		<Modal
			show
			onClose={() => setUpsellModal(false)}
			className={styles.custom_modal}
			closeOnOuterClick={false}
		>
			<Modal.Header title={`${startCase(primary_service?.trade_type)} ${startCase(service)}`} />
			<Modal.Body>
				<Layout controls={controls} formProps={formProps} />
			</Modal.Body>
			<Modal.Footer>
				<Footer
					onClose={() => setUpsellModal(false)}
					formProps={formProps}
					service={upsellableService}
					shipmentData={shipmentData}
					primary_service={primary_service}
				/>
			</Modal.Footer>
		</Modal>
	);
}
export default Form;
