import { ShipmentDetailContext } from '@cogoport/context';
import { useMemo } from 'react';

import useGetActiveStakeholder from '../hooks/useGetActiveStakeholder';
import useGetShipment from '../hooks/useGetShipment';
import useListShipmentServices from '../hooks/useListShipmentServices';
import getStakeholderConfig from '../stakeholderConfig';

import DefaultView from './DefaultView';

function LclFreight() {
	const activeStakeholder = useGetActiveStakeholder();
	const stakeholderConfig = getStakeholderConfig({ stakeholder: activeStakeholder });

	const shipment = useGetShipment();
	const services = useListShipmentServices();

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
