import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useShipmentIdView from '../../../hook/useShipmentIdView';
import AccordianCards from '../../ShipmentIdView/AccordianCards/index';

function SIDView({
	shipmentId = '',
	onTabClick = () => {},
	onAccept = () => {},
	showTab = false,
	sidDataChecked = false,
	jobNumberByQuery = '',
}) {
	const {
		list: { data = [] } = {},
	} = useShipmentIdView({ invoicesRequired: true, shipmentId, jobNumberByQuery });

	const [currentOpenSID, setCurrentOpenSID] = useState('');
	if (isEmpty(data)) return <h2>No Data Found</h2>;

	return (
		<AccordianCards
			itemData={data[GLOBAL_CONSTANTS.zeroth_index]}
			currentOpenSID={currentOpenSID}
			setCurrentOpenSID={setCurrentOpenSID}
			shipmentIdView={false}
			onTabClick={onTabClick}
			onAccept={onAccept}
			showTab={showTab}
			sidDataChecked={sidDataChecked}
		/>
	);
}

export default SIDView;
