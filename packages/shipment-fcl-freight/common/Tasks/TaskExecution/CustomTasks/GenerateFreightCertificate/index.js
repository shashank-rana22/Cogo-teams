import { Loader, Table } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import React, { useContext } from 'react';

import useGenerateFreightCertificate from '../../../../../hooks/useGenerateFreightCertificate';
import useListBillOfLadings from '../../../../../hooks/useListBillOfLadings';
import useUpdateShipmentPendingTask from '../../../../../hooks/useUpdateShipmentPendingTask';

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

	const { apiTrigger: updateTask } = useUpdateShipmentPendingTask({ });

	const { apiTrigger: generateCertificate, loading: generateLoading } = useGenerateFreightCertificate({});

	return (
		<div className={styles.container}>
			{ generateLoading
				? (
					<div className={styles.loaderr}>
						<Loader />
						Generating Certificate...
					</div>
				) : null}

			<div className={styles.title}>Container Details</div>
			<Table
				data={containersData || []}
				columns={tableColumn({ controls, control })}
				loading={loading}
				className={styles.styled_table}
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
					updateTask={updateTask}
					generateCertificate={generateCertificate}
					loading={generateLoading}
				/>
			</div>
		</div>
	);
}

export default GenerateFreightCertificate;
