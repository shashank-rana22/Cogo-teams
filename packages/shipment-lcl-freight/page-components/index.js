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

	const { get } = useGetShipment();
	const { servicesGet = {} }  = useListShipmentServices();

	const contextValues = useMemo(() => ({
		...get,
		...servicesGet,
		stakeholderConfig,
		activeStakeholder,
	}), [get, servicesGet, stakeholderConfig, activeStakeholder]);

	console.log({contextValues})

	return (
		<ShipmentDetailContext.Provider value={contextValues}>
			<DefaultView />
		</ShipmentDetailContext.Provider>
	);
}

export default LclFreight;
