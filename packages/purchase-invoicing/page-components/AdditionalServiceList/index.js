import { ShipmentDetailContext } from '@cogoport/context';
import React, { useContext } from 'react';

import AdditionalList from '../AdditionalList';

function AdditionalServiceList() {
	const { servicesList, refetchServices } = useContext(
		ShipmentDetailContext,
	);
	return (
		<AdditionalList services={servicesList} refetchServices={refetchServices} />
	);
}

export default AdditionalServiceList;
