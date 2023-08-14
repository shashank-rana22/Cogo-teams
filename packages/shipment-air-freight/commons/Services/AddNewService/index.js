import { ShipmentDetailContext } from '@cogoport/context';
import { IcMPlus } from '@cogoport/icons-react';
import React, { useState, useContext } from 'react';

import upsellTransportation from '../helpers/upsellTransportation';

import Form from './Form';
import styles from './styles.module.css';

function AddNewService({
	serviceObj = {},
	upsellableService = {},
}) {
	const { cancelUpsellDestinationFor, cancelUpsellOriginFor } = upsellTransportation(serviceObj);

	const { primary_service } = useContext(ShipmentDetailContext);

	const [upsellModal, setUpsellModal] = useState(false);

	/* These services cant be upselled */
	let cancelUpsell = !upsellableService?.service_type;

	if (cancelUpsellOriginFor === upsellableService.service_type && upsellableService.trade_type === 'export') {
		cancelUpsell = true;
	}

	if (cancelUpsellDestinationFor === upsellableService.service_type && upsellableService.trade_type === 'import') {
		cancelUpsell = true;
	}

	/* Hualage is upsellable only for icd shipments */
	let isUpsellable = true;

	if (upsellableService.service_type === 'haulage_freight_service') {
		isUpsellable = (primary_service?.origin_port?.is_icd
			|| primary_service?.destination_port?.is_icd);
	}

	const closeModal = () => {
		setUpsellModal(!upsellModal);
	};

	const showAddServiceBox = !cancelUpsell && isUpsellable;

	return (
		<>
			{showAddServiceBox ? (
				<div
					className={styles.container}
					onClick={closeModal}
					role="button"
					tabIndex={0}
				>
					<div className={styles.text}>{upsellableService.display_label}</div>
					<IcMPlus />
				</div>
			) : null}

			{upsellModal ? (
				<Form
					closeModal={closeModal}
					upsellableService={upsellableService}
				/>
			) : null}

		</>
	);
}

export default AddNewService;
