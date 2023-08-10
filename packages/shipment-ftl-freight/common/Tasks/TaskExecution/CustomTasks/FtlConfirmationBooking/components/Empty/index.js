import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import useListRevenueDeskShowedRates from '../../hooks/useListRevenueDeskShowedRates';

import styles from './styles.module.css';

const APPROVAL = 'You will see rates once RD Approves your shipment.';

function Empty({
	source = '',
	shipment_id = '',
	service_type = 'ftl_freight_service',
	service_ids = [],
}) {
	const { data, loading } = useListRevenueDeskShowedRates({
		shipment_id,
		service_type,
		service_ids,
	});

	let message = 'Please wait while we get reverts from supply.';
	if (!loading) {
		const flashedRates = (data || []).filter(
			(item) => item.source === 'flashed',
		);
		if (!isEmpty(flashedRates)) {
			message = `Your booking is being reviewed by Revenue Desk. ${APPROVAL}`;
		}
	}
	return (
		<div className={styles.container}>
			<img
				src={GLOBAL_CONSTANTS.image_url.empty_data_image}
				alt="No results"
				width="300px"
				height="200px"
			/>
			{source === 'contract' ? (
				<>
					<div className={styles.text}>Reverted Rates are expired</div>
					<div className={styles.text}>
						Please ask one of the supply agents to revert another rate
					</div>
				</>
			) : (
				<div className={styles.text}>{message}</div>
			)}
		</div>
	);
}

export default Empty;
