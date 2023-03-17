import { ShipmentDetailContext } from '@cogoport/context';
import React, { useMemo } from 'react';

import useGetShipment from '../../hooks/useGetShipment';
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
