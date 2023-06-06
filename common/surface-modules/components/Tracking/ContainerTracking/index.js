import React, { useState, useEffect } from 'react';

import useGetSaasContainerSubscription from '../../../hooks/useGetSaasContainerSubscription';

import styles from './styles.module.css';
import TrackingDetails from './TrackingDetails';
import TrackingHeader from './TrackingHeader';

function ContainerTracking({ shipment_data = {}, refetch = () => {} }) {
	const serialId = shipment_data?.serial_id;

	const [containerNo, setContainerNo] = useState('');

	const truckOptions = [];
	const ftlServices = (shipment_data?.all_services || []).filter((item) => truckOptions.push({
		label : item?.truck_number,
		value : item?.truck_number,
	}));

	const {
		loading,
		listShipments,
		data: list,
	} = useGetSaasContainerSubscription({
		serialId,
		truckNumber: containerNo || truckOptions?.[0]?.value,
	});

	const ContainerOptions = Array.isArray(list)
		? (list || [])
			.filter((e) => e?.type === 'CONTAINER_NO')
			?.map((e) => ({ label: e?.input, value: e?.input }))
		: [];

	useEffect(() => {
		refetch();
	}, [refetch]);

	return (
		<div className={styles.Container}>
			<TrackingHeader
				trackingLoading={loading}
				ContainerOptions={ContainerOptions}
				setContainerNo={setContainerNo}
				containerNo={
							containerNo
							|| ContainerOptions?.[0]?.value
							|| truckOptions?.[0]?.value
						}
				truckOptions={truckOptions}
				shipmentId={shipment_data?.id}
				serialId={serialId}
				airwayBillNo={list?.airway_bill_no}
				data={list}
				listShipments={listShipments}
				refetch={refetch}
				ftlServices={ftlServices}
			/>
			<TrackingDetails
				list={list}
				loading={loading}
			/>
		</div>
	);
}

export default ContainerTracking;
