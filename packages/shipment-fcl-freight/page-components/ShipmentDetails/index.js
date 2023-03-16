import React, { useMemo } from 'react';

import { ShipmentDetailContext } from '../../common/context';
import useGetShipment from '../../hooks/useGetShipment';

import ShipmentInfo from './ShipmentInfo';
import Tab from './Tabs';
import Timeline from './TimeLine';
import TopBar from './TopBar';

function ShipmentDetails() {
	const { isGettingShipment, refetch, data } = useGetShipment();

	const contextValues = useMemo(() => ({
		isGettingShipment,
		refetch,
		...data,
	}), [data, isGettingShipment, refetch]);

	return (
		<ShipmentDetailContext.Provider value={contextValues}>
			<ShipmentInfo />
			<TopBar />
			<Timeline />
			<Tab />
		</ShipmentDetailContext.Provider>
	);
}

export default ShipmentDetails;
