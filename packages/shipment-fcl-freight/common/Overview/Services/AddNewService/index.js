import { IcMPlus } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import Form from './Form';
import styles from './styles.module.css';

function AddNewService({
	upsellableService = {},
	servicesList = [],
	shipmentData = {},
	primary_service = {},
	cancelUpsellOriginFor = '',
	cancelUpsellDestinationFor = '',
	activeStakeholder = '',
	setShowTradeHeading = () => {},
	showTradeHeading = {},
}) {
	const haveToUpsell = servicesList?.length === 0
		&& upsellableService.service_type === 'fcl_freight_local_service'
		&& primary_service?.bl_category === 'hbl';

	const [upsellModal, setUpsellModal] = useState(haveToUpsell);

	/* These services cant be upselled */
	const cancelUpsell = !upsellableService?.service_type
	|| [cancelUpsellDestinationFor,
		cancelUpsellOriginFor,
		'fcl_freight_service'].includes(upsellableService?.service_type);

	/* Hualage is upsellable only for icd shipments */
	let isUpsellable = true;

	if (upsellableService.service_type === 'haulage_freight_service') {
		isUpsellable = (primary_service?.origin_port?.is_icd
			|| primary_service?.destination_port?.is_icd);
	}

	/* user can only upsell services for the location to which its org is tagged */
	let canUpsellForTradeType = true;

	if (activeStakeholder === 'booking_agent' && primary_service?.trade_type !== upsellableService?.trade_type) {
		canUpsellForTradeType = false;
	} else if (activeStakeholder === 'consignee_shipper_booking_agent'
		&& primary_service?.trade_type === upsellableService?.trade_type) {
		canUpsellForTradeType = false;
	}

	const closeModal = () => {
		setUpsellModal(!upsellModal);
	};

	const showAddServiceBox = !cancelUpsell && isUpsellable && canUpsellForTradeType;
	const { origin, destination, main } = showTradeHeading;

	useEffect(() => {
		if (showAddServiceBox) {
			setShowTradeHeading({
				origin      : origin || upsellableService.trade_type === 'export',
				destination : destination || upsellableService.trade_type === 'import',
				main,
			});
		}
	}, [showAddServiceBox, upsellableService.trade_type, setShowTradeHeading, origin, destination, main]);

	return (
		<>
			{ showAddServiceBox
				? (
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
					servicesList={servicesList}
					shipmentData={shipmentData}
					upsellableService={upsellableService}
					primary_service={primary_service}
					haveToUpsell={haveToUpsell}
				/>
			) : null}

		</>
	);
}

export default AddNewService;
