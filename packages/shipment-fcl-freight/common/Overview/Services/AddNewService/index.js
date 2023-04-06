import { cl } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Form from './Form';
import styles from './styles.module.css';

function AddNewService({
	upsellableService = {},
	servicesList = [],
	shipmentData = {},
	primary_service = {},
	cancelUpsellOriginFor = '',
	cancelUpsellDestinationFor = '',
}) {
	const [upsellModal, setUpsellModal] = useState(false);

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

			{upsellModal ? (
				<Form
					upsellModal={upsellModal}
					setUpsellModal={setUpsellModal}
					servicesList={servicesList}
					shipmentData={shipmentData}
					upsellableService={upsellableService}
					primary_service={primary_service}
				/>
			) : null}

		</>
	);
}

export default AddNewService;
