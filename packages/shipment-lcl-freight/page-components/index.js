import { ShipmentDetailContext } from '@cogoport/context';

import useGetShipment from '../hooks/useGetShipment';

import ComponentsMapping from './DefaultView/ComponentsMapping';

function LclFreight() {
	const { data, loading } = useGetShipment();
	return (
		<ShipmentDetailContext.Provider>
			<ComponentsMapping />
		</ShipmentDetailContext.Provider>
	);
}

export default LclFreight;
