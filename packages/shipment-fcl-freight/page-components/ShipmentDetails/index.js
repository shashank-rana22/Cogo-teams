import { ShipmentDetailContext } from '@cogoport/context';
import { ShipmentChat } from '@cogoport/shipment-chat';
import React, { useMemo } from 'react';

import useGetShipment from '../../hooks/useGetShipment';
import useGetShipmentTimeLine from '../../hooks/useGetShipmentTimeline';
import useListShipmentServices from '../../hooks/useListShipmentServices';

import ShipmentInfo from './ShipmentInfo';
import styles from './styles.module.css';
import Tab from './Tabs';
import Timeline from './TimeLine';
import TopBar from './TopBar';

function ShipmentDetails() {
	const { get } = useGetShipment();
	const { shipment_data } = get;
	const { servicesGet } = useListShipmentServices({ shipment_data });

	const {
		loading: shipmentTimelineLoading,
		getShipmentTimeline, timelineData,
	} = useGetShipmentTimeLine({ shipment_data });

	const contextValues = useMemo(() => ({
		...get,
		...servicesGet,
		getShipmentTimeline,
	}), [get, servicesGet, getShipmentTimeline]);

	return (
		<ShipmentDetailContext.Provider value={contextValues}>
			<div className={styles.header}>
				<ShipmentInfo />
				<ShipmentChat />
			</div>

			<TopBar />
			<Timeline timelineData={timelineData} loading={shipmentTimelineLoading} />
			<Tab shipment_data={shipment_data} />
		</ShipmentDetailContext.Provider>
	);
}

export default ShipmentDetails;
