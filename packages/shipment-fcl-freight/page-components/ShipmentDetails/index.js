import React, { useMemo } from 'react';

import { ShipmentDetailContext } from '../../common/context';
import useGetShipment from '../../hooks/useGetShipment';
import useListShipmentServices from '../../hooks/useListShipmentServices';

import ShipmentInfo from './ShipmentInfo';
import Tab from './Tabs';
import Timeline from './TimeLine';
import TopBar from './TopBar';
import { ShipmentChat } from '../../../../common/shipment-chat';

function ShipmentDetails() {
	const { get } = useGetShipment();

	const { servicesGet } = useListShipmentServices();

	const contextValues = useMemo(() => ({
		...get,
		...servicesGet,
	}), [get, servicesGet]);

	return (
		<ShipmentDetailContext.Provider value={contextValues}>
			<ShipmentChat />
			<ShipmentInfo />
			<TopBar />
			<Timeline />
			<Tab />
		</ShipmentDetailContext.Provider>
	);
}

export default ShipmentDetails;
