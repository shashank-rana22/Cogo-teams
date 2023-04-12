import { cl } from '@cogoport/components';
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
}) {
	const [upsellModal, setUpsellModal] = useState(false);

	const cancelUpsell = (!upsellableService?.service_type
	|| upsellableService?.service_type === cancelUpsellDestinationFor
		|| upsellableService?.service_type === cancelUpsellOriginFor)
		|| upsellableService.service_type === 'fcl_freight_service';

	let isUpsellable = true;

	if (upsellableService.service_type === 'haulage_freight_service') {
		isUpsellable = (primary_service?.origin_port?.is_icd
			|| primary_service?.destination_port?.is_icd);
	}

	let canUpsellForTradeType = true;

	if (activeStakeholder === 'Kam' && primary_service?.trade_type !== upsellableService.trade_type) {
		canUpsellForTradeType = false;
	} else if (activeStakeholder === 'DKam' && primary_service?.trade_type === upsellableService.trade_type) {
		canUpsellForTradeType = false;
	}

	const haveToUpsell = servicesList?.length === 0 && upsellableService.service_type === 'fcl_freight_local_service';

	useEffect(() => {
		if (haveToUpsell) {
			setUpsellModal(true);
		}
	}, [haveToUpsell, setUpsellModal]);

	return (
		<>
			{ !cancelUpsell && isUpsellable && canUpsellForTradeType
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
					haveToUpsell={haveToUpsell}
				/>
			) : null}

		</>
	);
}

export default AddNewService;
