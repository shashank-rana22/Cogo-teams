import { dynamic } from '@cogoport/next';
import { useState } from 'react';

import Header from './Header';

const RESOLVE_SHIPMENT = {
	fcl  : dynamic(() => import('./Fcl'), { ssr: false }),
	air  : dynamic(() => import('./Air'), { ssr: false }),
	rail : dynamic(() => import('./Rail'), { ssr: false }),
};

function DetentionDemurrage() {
	const [activeShipment, setActiveShipment] = useState('fcl');

	const Shipment = RESOLVE_SHIPMENT[activeShipment];

	return (
		<div>
			<Header setActiveShipment={setActiveShipment} activeShipment={activeShipment} />
			<div>
				<Shipment />
			</div>
		</div>
	);
}

export default DetentionDemurrage;
