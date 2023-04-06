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
	const shipment_additional_methods = useMemo(() => ['main_service',
		'documents', 'bl_container_mappings', 'containers'], []);

	const { get } = useGetShipment({ additional_methods: shipment_additional_methods });
	const { shipment_data } = get;

	const services_additional_methods = useMemo(() => [
		'booking_requirement',
		'stakeholder',
		'service_objects'], []);

	const { servicesGet } = useGetServices({
		shipment_id        : shipment_data?.id,
		additional_methods : services_additional_methods,
	});

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
