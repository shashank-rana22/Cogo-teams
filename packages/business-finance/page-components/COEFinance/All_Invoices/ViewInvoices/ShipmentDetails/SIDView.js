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

	return data?.map((item) => (
		<AccordianCards
			itemData={item}
			currentOpenSID={currentOpenSID}
			setCurrentOpenSID={setCurrentOpenSID}
			key={item?.jobId}
			shipmentIdView={false}
			setCheckItem={setCheckItem}
		/>
	));
}

export default SIDView;
