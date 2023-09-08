import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState } from 'react';

import useShipmentIdView from '../../../hook/useShipmentIdView.ts';
import AccordianCards from '../../ShipmentIdView/AccordianCards/index.tsx';

function SIDView({ shipmentId = '' }) {
	const {
		list: { data },
	} = useShipmentIdView({ invoicesRequired: true, shipmentId });

	const [currentOpenSID, setCurrentOpenSID] = useState('');

	return (
		<div>
			{data ? (
				<AccordianCards
					itemData={data?.[GLOBAL_CONSTANTS.zeroth_index]}
					currentOpenSID={currentOpenSID}
					setCurrentOpenSID={setCurrentOpenSID}
					shipmentIdView={false}
				/>
			) : <h>No Data Found</h>}
		</div>
	);
}

export default SIDView;
