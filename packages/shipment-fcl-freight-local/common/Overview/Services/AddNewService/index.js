import { IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import Form from './Form';
import styles from './styles.module.css';

const INCO_TERM_CANNOT_UPSELL = ['cif', 'cfr', 'fob'];

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

	/* user can only upsell services for the location to which its org is tagged */
	let canUpsellForTradeType = true;

	if (shipmentData?.end_to_end_shipment?.is_possible) {
		if (activeStakeholder === 'booking_agent' && ((primary_service?.trade_type !== upsellableService?.trade_type
			&& INCO_TERM_CANNOT_UPSELL.includes(primary_service?.inco_term))
		)) {
			canUpsellForTradeType = false;
		} else if (activeStakeholder === 'consignee_shipper_booking_agent'
			&& primary_service?.trade_type === upsellableService?.trade_type) {
			canUpsellForTradeType = false;
		}
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
					activeStakeholder={activeStakeholder}
				/>
			) : null}

		</>
	);
}

export default AddNewService;
