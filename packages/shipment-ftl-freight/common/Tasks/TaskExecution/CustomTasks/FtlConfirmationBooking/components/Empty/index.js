import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import Image from 'next/image';
import React from 'react';

import useListRevenueDeskShowedRates from '../../hooks/useListRevenueDeskShowedRates';

import styles from './styles.module.css';

const FLASH_MSG = 'Your booking is being reviewed by Revenue Desk. You will see rates once RD Approves your shipment.';

function Empty({
	source = '',
	id = '',
	service_type = 'ftl_freight_service',
	service_ids = [],
}) {
	const { data = [], loading = false } = useListRevenueDeskShowedRates({
		shipment_id: id,
		service_type,
		service_ids,
	});

	let message = 'Please wait while we get reverts from supply.';
	if (!loading) {
		const flashedRates = (data || []).some(
			(item) => item?.source === 'flashed',
		);
		if (flashedRates) {
			message = FLASH_MSG;
		}
	}
	return (
		<div className={styles.container}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.empty_data_image}
				alt="No results"
				width={300}
				height={200}
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
