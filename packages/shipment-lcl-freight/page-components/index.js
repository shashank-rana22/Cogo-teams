import { ShipmentDetailContext } from '@cogoport/context';
import { useRouter } from '@cogoport/next';
import { useMemo } from 'react';

import useGetActiveStakeholder from '../hooks/useGetActiveStakeholder';
import useGetShipment from '../hooks/useGetShipment';
import useListShipmentServices from '../hooks/useListShipmentServices';
import getStakeholderConfig from '../stakeholderConfig';

import DefaultView from './DefaultView';

function LclFreight() {
	const router = useRouter();
	const { shipment_id } = router.query || {};

	const activeStakeholder = useGetActiveStakeholder();
	const stakeholderConfig = getStakeholderConfig({ stakeholder: activeStakeholder });

	const shipment = useGetShipment({ defaultFilters: { id: shipment_id } });
	const services = useListShipmentServices({});

	const contextValues = useMemo(() => ({
		...shipment,
		...services,
		stakeholderConfig,
		activeStakeholder,
	}), [shipment, services, stakeholderConfig, activeStakeholder]);

	return (
		<ShipmentDetailContext.Provider value={contextValues}>
			<DefaultView />
		</ShipmentDetailContext.Provider>
	);
}

export default LclFreight;
