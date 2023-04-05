import { ShipmentDetailContext } from '@cogoport/context';
import { dynamic } from '@cogoport/next';
import React, { useMemo } from 'react';

import useGetServices from '../../hooks/useGetServices';
import useGetShipment from '../../hooks/useGetShipment';
import useGetTimeLine from '../../hooks/useGetTimeline';
import { useStakeholderCheck } from '../../hooks/useStakeholderCheck';

const Kam = dynamic(() => import('./StakeholdersView/Kam'), { ssr: false });
const Superadmin = dynamic(() => import('./StakeholdersView/Superadmin'), { ssr: false });

function ShipmentDetails() {
	const { get } = useGetShipment();
	const { shipment_data } = get;

	const additional_methods = useMemo(() => [
		'booking_requirement',
		'stakeholder',
		'service_objects'], []);

	const { servicesGet } = useGetServices({ shipment_data, additional_methods });
	const { getTimeline } = useGetTimeLine({ shipment_data });
	const { activeStakeholder } = useStakeholderCheck();

	const contextValues = useMemo(() => ({
		...get,
		...servicesGet,
		...getTimeline,
		activeStakeholder,
	}), [get, servicesGet, getTimeline, activeStakeholder]);

	const importStakeholderView = () => {
		switch (activeStakeholder) {
			case 'KAM':
				return <Kam />;

			case 'Superadmin':
				return <Superadmin />;
			default:
				return null;
		}
	};

	return (
		<ShipmentDetailContext.Provider value={contextValues}>
			{importStakeholderView()}
		</ShipmentDetailContext.Provider>
	);
}

export default ShipmentDetails;
