import ScopeSelect from '@cogoport/scope-select';
import { ShipmentChat } from '@cogoport/shipment-chat';
import { useContext } from 'react';

import KamDeskContext from '../../context/KamDeskContext';

function HeaderFilters() {
	const { scopeFilters = {} } = useContext(KamDeskContext);

	return (
		<>
			<ShipmentChat />
			<ScopeSelect size="md" defaultValues={scopeFilters} />
		</>

	);
}

export default HeaderFilters;
