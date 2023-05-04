import { useContext } from 'react';

import KamDeskContext from '../../../context/KamDeskContext';

function Critical() {
	const { filters, setFilters, shipment_type, stepperTab, activeTab } = useContext(KamDeskContext);

	return (
		<div>
			critical
		</div>
	);
}

export default Critical;
