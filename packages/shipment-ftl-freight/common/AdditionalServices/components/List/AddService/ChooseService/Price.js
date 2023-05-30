import { Button } from '@cogoport/components';
import React from 'react';

import useCreateShipmentAdditionalService from '../../../../../../hooks/useCreateShipmentAdditionalService';

import styles from './styles.module.css';

function Price({
	item,
	isSeller,
	setAddRate,
	refetch = () => {},
	setShowChargeCodes = () => {},
	setShowPrice,
}) {
	const afterRequestRate = () => {
		setShowChargeCodes(false);
		refetch();
	};

	const { apiTrigger, loading } = useCreateShipmentAdditionalService({
		refetch        : afterRequestRate,
		successMessage : 'Successfully Requested',
	});

	const onRequestRate = (data) => {
		const addedService = (data.services || []).find(
			(service) => service.service_type === data.service_type,
		);
		const { name, code, shipment_id, service_type } = data;
		const payload = {
			name,
			code,
			shipment_id,
			service_type,
			service_id            : addedService?.id,
			is_rate_available     : false,
			state                 : 'requested_for_importer_exporter',
			add_to_sell_quotation : true,
		};

		apiTrigger(payload);
	};

	return item?.rates ? (
		<p>$ 0</p>
	) : (
		<div className={styles.price_div}>
			{!isSeller ? (
				<Button
					themeType="secondary"
					onClick={(e) => {
						e.stopPropagation();
						setAddRate(item);
					}}
					style={{ marginRight: 10 }}
				>
					Add Rate
				</Button>
			) : null}

			<Button
				themeType="secondary"
				onClick={(e) => {
					e.stopPropagation();
					onRequestRate(item);
				}}
				style={{ marginRight: 10 }}
				disabled={loading}
			>
				{isSeller ? 'Add Rate' : 'Request Rate'}
			</Button>
			<Button
				themeType="secondary"
				onClick={async (e) => {
					e.stopPropagation();
					setShowPrice({ item });
				}}
			>
				View Rates
			</Button>
		</div>
	);
}

export default Price;
