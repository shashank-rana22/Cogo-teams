import { ShipmentDetailContext } from '@cogoport/context';
import { useMemo } from 'react';

import useGetActiveStakeholder from '../hooks/useGetActiveStakeholder';
import useGetShipment from '../hooks/useGetShipment';
import stakeholderConfig from '../stakeholderConfig';

import DefaultView from './DefaultView';

function LclFreight() {
	const activeStakeholder = useGetActiveStakeholder();
	const stakeholder_config = stakeholderConfig({ stakeholder: activeStakeholder });
	const { data, loading, apiTrigger } = useGetShipment();

	const contextValues = useMemo(() => ({
		shipment_data    : data,
		shipment_loading : loading,
		stakeholder_config,
		activeStakeholder,
		shipment_refetch : apiTrigger,
	}), [data, loading, stakeholder_config, activeStakeholder, apiTrigger]);

	return (
		<ShipmentDetailContext.Provider value={contextValues}>
			<DefaultView />
		</ShipmentDetailContext.Provider>
	);
}

export default LclFreight;
