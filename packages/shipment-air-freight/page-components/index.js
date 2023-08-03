import { ShipmentDetailContext } from '@cogoport/context';
import { useRouter } from '@cogoport/next';
import { useMemo } from 'react';

import useGetActiveStakeholder from '../hooks/useGetActiveStakeholder';
import useGetShipment from '../hooks/useGetShipment';
import useGetServiceTimeline from '../hooks/useGetTimeLine';
import useListShipmentServices from '../hooks/useListShipmentServices';
import getStakeholderConfig from '../stakeholderConfig';

import DefaultView from './DefaultView';

function ShipmentAirFreight() {
	const router = useRouter();
	const { shipment_id } = router.query || {};

	const activeStakeholder = useGetActiveStakeholder();
	const stakeholderConfig = getStakeholderConfig({ stakeholder: activeStakeholder });
	const shipment = useGetShipment({ defaultParams: { id: shipment_id } });
	const services = useListShipmentServices({
		defaultFilters: {
			shipment_id,
			status: ['active', 'pending', 'inactive'],
		},
		defaultParams: {
			service_stakeholder_required : true,
			can_edit_booking_params      : true,
			page_limit                   : 100,
		},
	});
	const timeline = useGetServiceTimeline({
		defaultParams : { shipment_id: shipment?.shipment_data?.id },
		initialCall   : false,
	});
	const contextValues = useMemo(() => ({
		...shipment,
		...services,
		...timeline,
		stakeholderConfig,
		activeStakeholder,
	}), [shipment, services, stakeholderConfig, activeStakeholder, timeline]);
	return (
		<ShipmentDetailContext.Provider value={contextValues}>
			<DefaultView />
		</ShipmentDetailContext.Provider>
	);
}

export default ShipmentAirFreight;
