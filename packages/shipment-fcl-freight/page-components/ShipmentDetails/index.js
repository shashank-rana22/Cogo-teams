import { ShipmentDetailContext } from '@cogoport/context';
import React, { useMemo } from 'react';

import useGetShipment from '../../hooks/useGetShipment';
import useGetShipmentTimeLine from '../../hooks/useGetShipmentTimeline';
import useListShipmentServices from '../../hooks/useListShipmentServices';

import ShipmentInfo from './ShipmentInfo';
import Tab from './Tabs';
import Timeline from './TimeLine';
import TopBar from './TopBar';
import { ShipmentChat } from '../../../../common/shipment-chat';

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
			<ShipmentChat />
			<ShipmentInfo />
			<TopBar />
			<Timeline timelineData={timelineData} loading={shipmentTimelineLoading} />
			<Tab />
		</ShipmentDetailContext.Provider>
	);
}

export default ShipmentDetails;
