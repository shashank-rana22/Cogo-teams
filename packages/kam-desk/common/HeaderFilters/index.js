import { routeConfig } from '@cogoport/navigation-configs';
import ScopeSelect from '@cogoport/scope-select';
import { ShipmentChat } from '@cogoport/shipment-chat';
import { useSelector } from '@cogoport/store';
import { useContext } from 'react';

import KamDeskContext from '../../context/KamDeskContext';

function HeaderFilters() {
	const { general } = useSelector((s) => s);
	const { scopeFilters = {} } = useContext(KamDeskContext);
	const { pathname } = general;

	const navigation = routeConfig?.[pathname]?.navigation || '';
	return (
		<div>
			<ShipmentChat navigation={navigation} />
			<ScopeSelect size="md" defaultValues={scopeFilters} />
		</div>

	);
}

export default HeaderFilters;
