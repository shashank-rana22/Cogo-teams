import ScopeSelect from '@cogoport/scope-select';
import { useContext } from 'react';

import IGMDeskContext from '../../context/IGMDeskContext';

function HeaderFilters() {
	const { scopeFilters = {} } = useContext(IGMDeskContext);

	return <ScopeSelect size="md" defaultValues={scopeFilters} />;
}

export default HeaderFilters;
