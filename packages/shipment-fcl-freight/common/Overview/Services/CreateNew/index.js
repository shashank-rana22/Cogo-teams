import { Modal, cl } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Form from '../../../Form';

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

	const service = upsellableService.service_type.replace('_service', '');

	const cancelUpsell = !upsellableService?.service_type
	|| upsellableService?.service_type === cancelUpsellDestinationFor
		|| upsellableService?.service_type === cancelUpsellOriginFor;

	let isUpsellable = true;

	if (upsellableService.service_type === 'haulage_freight_service') {
		isUpsellable = (primary_service?.origin_port?.is_icd
			|| primary_service?.destination_port?.is_icd);
	}

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
				className="primary lg"
				styles={{ dialog: { width: 700 } }}
			>
				<Form
					service={service}
					onClose={() => setUpsellModal(false)}
					shipmentData={shipmentData}
					primary_service={primary_service}
					services={servicesList}
				/>
			</Modal>
		</>
	);
}

export default CreateNew;
