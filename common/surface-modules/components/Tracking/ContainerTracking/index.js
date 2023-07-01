import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState, useEffect } from 'react';

import useGetSaasContainerSubscription from '../../../hooks/useGetSaasContainerSubscription';

import styles from './styles.module.css';
import TrackingDetails from './TrackingDetails';
import TrackingHeader from './TrackingHeader';

const DEFAULT_INDEX = GLOBAL_CONSTANTS.zeroth_index;

function ContainerTracking({ shipment_data = {}, refetch = () => {} }) {
	const serialId = shipment_data?.serial_id;

	const [containerNo, setContainerNo] = useState('');

	const TRUCK_OPTIONS = [];
	const ftlServices = (shipment_data?.all_services || []).filter((item) => TRUCK_OPTIONS.push({
		label : item?.truck_number,
		value : item?.truck_number,
	}));

	const {
		loading,
		listShipments,
		data: list,
	} = useGetSaasContainerSubscription({
		serialId,
		truckNumber: containerNo || TRUCK_OPTIONS?.[DEFAULT_INDEX]?.value,
	});

	const containerOptions = Array.isArray(list)
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
				ContainerOptions={containerOptions}
				setContainerNo={setContainerNo}
				containerNo={
							containerNo
							|| containerOptions?.[DEFAULT_INDEX]?.value
							|| TRUCK_OPTIONS?.[DEFAULT_INDEX]?.value
						}
				truckOptions={TRUCK_OPTIONS}
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
