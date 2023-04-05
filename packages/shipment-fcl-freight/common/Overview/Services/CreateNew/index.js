import { Modal, cl } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useServiceUpsellControls from '../../../../hooks/useFormatServiceUpsellControls';
import Footer from '../../../Footer';
import Layout from '../../../Layout';

import styles from './styles.module.css';

function CreateNew({
	upsellableService = {},
	servicesList = [],
	shipmentData = {},
	primary_service = {},
	cancelUpsellOriginFor = '',
	cancelUpsellDestinationFor = '',
}) {
	const [upsellModal, setUpsellModal] = useState(false);
	const [truckTypeToggle, setTruckTypeToggle] = useState(false);

	const service = upsellableService.service_type.replace('_service', '');

	const cancelUpsell = !upsellableService?.service_type
	|| upsellableService?.service_type === cancelUpsellDestinationFor
		|| upsellableService?.service_type === cancelUpsellOriginFor;

	let isUpsellable = true;

	if (upsellableService.service_type === 'haulage_freight_service') {
		isUpsellable = (primary_service?.origin_port?.is_icd
			|| primary_service?.destination_port?.is_icd);
	}

	const { controls, formProps } = useServiceUpsellControls({
		service,
		services: servicesList,
		truckTypeToggle,
		setTruckTypeToggle,
	});

	return (
		<>
			{ !cancelUpsell && isUpsellable
				? (
					<div
						className={cl` ${styles.container} ie_create_new_service `}
						onClick={() => setUpsellModal(true)}
						role="button"
						tabIndex={0}
					>
						<div className={styles.text}>{upsellableService.display_label}</div>
						<IcMPlus />
					</div>
				) : null}

			<Modal
				show={upsellModal}
				onClose={() => setUpsellModal(false)}
				className={styles.custom_modal}
			>
				<Modal.Header title={`${startCase(primary_service?.trade_type)} ${startCase(service)}`} />
				<Modal.Body>
					<Layout controls={controls} formProps={formProps} />
				</Modal.Body>
				<Modal.Footer>
					<Footer
						onClose={() => setUpsellModal(false)}
						formProps={formProps}
						service={service}
						shipmentData={shipmentData}
						services={servicesList}
						primary_service={primary_service}
					/>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default CreateNew;
