import { Table } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import React, { useContext } from 'react';

import useListBillOfLadings from '../../../../../hooks/useListBillOfLadings';

import FreightRate from './FreightRate';
import formatDataForTable from './helpers/formatDataForTable';
import styles from './styles.module.css';
import tableColumn from './tableColumn';

function GenerateFreightCertificate({
	task = {},
	refetch,
	onCancel,
}) {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const services = shipment_data?.all_services || [];

	const { containerDetails, loading } = useListBillOfLadings({ shipment_data });

	const containersArray = containerDetails?.[shipment_data?.id];

	const { watch, control } = useForm();

	const { containersData, controls } = formatDataForTable(services, containersArray);

	const formValue = watch();

	// useEffect(() => {
	// 	(containersData || [])?.forEach((ele, index) => {
	// 		setValue(
	// 			`is_hazardous-${index + 1}`,
	// 			containersData?.[index]?.is_hazardous
	// 				? `hazardous-${ele?.container_size}-${ele?.container_type}`
	// 				: `non_hazardous-${ele?.container_size}-${ele?.container_type}`,
	// 		);
	// 	});
	// }, [JSON.stringify(containersArray || [])]);

	return (
		<div className={styles.container}>
			<div className={styles.title}>Container Details</div>
			<Table
				data={containersData || []}
				columns={tableColumn({ controls, control })}
				loading={loading}
			/>

			<div className={styles.rate_container}>
				<div className={styles.title}>Freight Declaration Section</div>

				<FreightRate
					task={task}
					containersData={containersData}
					commodityValues={formValue}
					shipmentData={shipment_data}
					refetch={refetch}
					onCancel={onCancel}
				/>
			</div>
		</div>
	);
}

export default GenerateFreightCertificate;
