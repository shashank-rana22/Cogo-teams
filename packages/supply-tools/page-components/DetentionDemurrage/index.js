import { dynamic } from '@cogoport/next';
import { useState } from 'react';

import Header from './Header';

const RESOLVE_SHIPMENT = {
	ocean : dynamic(() => import('./Fcl'), { ssr: false }),
	rail  : dynamic(() => import('./Rail'), { ssr: false }),
};

function DetentionDemurrage() {
	const [activeShipment, setActiveShipment] = useState('ocean');

	const Shipment = RESOLVE_SHIPMENT[activeShipment] || null;

	return (
		<div>
			<Header
				setActiveShipment={setActiveShipment}
				activeShipment={activeShipment}
			/>

			<div>
				{Shipment ? <Shipment activeShipment={activeShipment} /> : null}
			</div>
		</div>
	);
}

export default DetentionDemurrage;
