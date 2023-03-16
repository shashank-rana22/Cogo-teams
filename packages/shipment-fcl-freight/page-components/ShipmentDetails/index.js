import React, { useMemo } from 'react';

import { ShipmentDetailContext } from '../../common/context';
import useGetShipment from '../../hooks/useGetShipment';
import useListShipmentServices from '../../hooks/useListShipmentServices';

import ShipmentInfo from './ShipmentInfo';
import Tab from './Tabs';
import Timeline from './TimeLine';
import TopBar from './TopBar';

function ShipmentDetails() {
	const { get } = useGetShipment();

	const { servicesGet } = useListShipmentServices({ ...get });

	const contextValues = useMemo(() => ({
		...get,
		...servicesGet,
	}), [get, servicesGet]);

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
