import { ShipmentDetailContext } from '@cogoport/context';
import { dynamic } from '@cogoport/next';
import React, { useMemo } from 'react';

import { useStakeholderCheck } from '../../helpers/useStakeholderCheck';
import useGetServices from '../../hooks/useGetServices';
import useGetShipment from '../../hooks/useGetShipment';
import useGetTimeLine from '../../hooks/useGetTimeline';

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
	const { ActiveStakeholder } = useStakeholderCheck();

	const contextValues = useMemo(() => ({
		...get,
		...servicesGet,
		...getTimeline,
		ActiveStakeholder,
	}), [get, servicesGet, getTimeline, ActiveStakeholder]);

	return (
		<ShipmentDetailContext.Provider value={contextValues}>

			{(ActiveStakeholder === 'KAM')
				? <Kam /> : (
					<Superadmin />
				)}

		</ShipmentDetailContext.Provider>
	);
}

export default ShipmentDetails;
