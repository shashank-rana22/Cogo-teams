import { Modal } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useServiceUpsellControls from '../../../../../hooks/useFormatServiceUpsellControls';
import Layout from '../../../../Layout';
import Footer from '../Footer';

import styles from './styles.module.css';

function Form({
	upsellableService,
	servicesList,
	shipmentData,
	primary_service,
	upsellModal,
	setUpsellModal,
	haveToUpsell,
}) {
	const [truckTypeToggle, setTruckTypeToggle] = useState(false);

	const service = upsellableService.service_type.replace('_service', '');

	const { controls, formProps } = useServiceUpsellControls({
		service,
		services: servicesList,
		truckTypeToggle,
		setTruckTypeToggle,
		upsellableService,
	});

	return (
		<Modal
			show={upsellModal}
			onClose={() => setUpsellModal(false)}
			showCloseIcon={!haveToUpsell}
			closeOnOuterClick={false}
			disabled={haveToUpsell}
			className={styles.custom_modal}
		>
			<Modal.Header title={`${startCase(upsellableService.trade_type)} ${startCase(service)}`} />
			<Modal.Body>
				{ controls?.length === 0
					? <div> Are you sure you want to upsell this service?</div>
					: <Layout controls={controls} formProps={formProps} />}
			</Modal.Body>
			<Modal.Footer>
				<Footer
					onClose={() => setUpsellModal(false)}
					formProps={formProps}
					service={upsellableService}
					shipmentData={shipmentData}
					primary_service={primary_service}
					haveToUpsell={haveToUpsell}
				/>
			</Modal.Footer>
		</Modal>
	);
}
export default Form;
