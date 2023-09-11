import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useShipmentIdView from '../../../hook/useShipmentIdView.ts';
import AccordianCards from '../../ShipmentIdView/AccordianCards/index.tsx';

function SIDView({ shipmentId = '', setCheckItem = () => {} }) {
	const {
		list: { data },
	} = useShipmentIdView({ invoicesRequired: true, shipmentId });

	const [currentOpenSID, setCurrentOpenSID] = useState('');
	if (isEmpty(data)) return <h>No Data Found</h>;

	return (
		<AccordianCards
			itemData={data[GLOBAL_CONSTANTS.zeroth_index]}
			currentOpenSID={currentOpenSID}
			setCurrentOpenSID={setCurrentOpenSID}
			shipmentIdView={false}
			setCheckItem={setCheckItem}
		/>
	);
}

export default SIDView;
