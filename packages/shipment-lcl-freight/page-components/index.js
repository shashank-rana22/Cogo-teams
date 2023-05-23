import { ShipmentDetailContext } from '@cogoport/context';
import ComponentsMapping from './DefaultView/ComponentsMapping'; 

function LclFreight() {
	return (
		<ShipmentDetailContext.Provider>
			<ComponentsMapping />
		</ShipmentDetailContext.Provider>
	);
}

export default LclFreight;
