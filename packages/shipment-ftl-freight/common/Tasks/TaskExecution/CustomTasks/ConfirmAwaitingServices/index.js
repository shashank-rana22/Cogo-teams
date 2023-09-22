import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import Comparison from './components/Comparison';
import useGetRateComparison from './hooks/useGetRateComparison';
import useUpdateConfirmAwaitingServices from './hooks/useUpdateConfirmAwaitingServices';
import styles from './styles.module.css';

function ConfirmAwaitingServices(
	{
		task = {},
		onCancel = () => {},
		refetch = () => {},
		services = [],
	},
) {
	const { data } = useGetRateComparison({
		shipment_id          : task?.shipment_id,
		trip_type            : services[GLOBAL_CONSTANTS?.zeroth_index]?.trip_type,
		importer_exporter_id : services[GLOBAL_CONSTANTS?.zeroth_index]?.importer_exporter_id,
		truck_type           : [services[GLOBAL_CONSTANTS?.zeroth_index]?.truck_type],
	});

	const { updateConfirmAwaitingServices } = useUpdateConfirmAwaitingServices({
		task,
		callback: () => {
			refetch();
			onCancel();
		},
	});

	return (
		<div>
			<Comparison
				ftl_freight_rates_count={data?.ftl_freight_rates_count}
				shipment_flash_booking_rates_count={data?.shipment_flash_booking_rates_count}
			/>
			<div className={styles.container}>
				<Button
					themeType="secondary"
					onClick={() => onCancel()}
				>
					CANCEL
				</Button>

				<Button
					themeType="primary"
					onClick={updateConfirmAwaitingServices}
				>
					SUBMIT
				</Button>
			</div>
		</div>
	);
}

export default ConfirmAwaitingServices;
