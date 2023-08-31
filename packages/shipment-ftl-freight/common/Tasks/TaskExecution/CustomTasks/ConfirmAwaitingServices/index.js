import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import Comparison from './components/Comparison';
import useGetRateComparison from './hooks/useGetRateComparison';
import useUpdateConfirmAwaitingServices from './hooks/useUpdateConfirmAwaitingServices';
import styles from './styles.module.css';

function ConfirmAwaitingServices(
	props,
) {
	const {
		task = {},
		onCancel = () => {},
		refetch = () => {},
		services = [],
	} = props || {};

	const { data } = useGetRateComparison({
		shipment_id          : task?.shipment_id,
		trip_type            : services[GLOBAL_CONSTANTS?.zeroth_index]?.trip_type,
		importer_exporter_id : services[GLOBAL_CONSTANTS?.zeroth_index]?.importer_exporter_id,
		truck_type           : [services[GLOBAL_CONSTANTS?.zeroth_index]?.truck_type],
	});

	const { updateConfirmAwaitingServices } = useUpdateConfirmAwaitingServices({
		task,
		callback: () => {
			onCancel();
			refetch();
		},
	});

	return (
		<div>
			<Comparison
				data={data}
			/>
			<div className={styles.container}>
				<div className={styles.button}>
					<Button
						themeType="secondary"
						onClick={() => onCancel()}
					>
						CANCEL
					</Button>
				</div>

				<div className={styles.button}>
					<Button
						themeType="primary"
						onClick={updateConfirmAwaitingServices}
					>
						SUBMIT
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ConfirmAwaitingServices;
