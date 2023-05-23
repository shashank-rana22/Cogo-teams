import { ShipmentDetailContext } from '@cogoport/context';

function LclFreight() {
	return (
		<ShipmentDetailContext.Provider>
			<div>Detail</div>
		</ShipmentDetailContext.Provider>
	);
}

export default LclFreight;
