import ScopeSelect from '@cogoport/scope-select';
import { useContext } from 'react';

import KamDeskContext from '../../context/KamDeskContext';

function HeaderFilters() {
	const { scopeFilters = {} } = useContext(KamDeskContext);

	return <ScopeSelect size="md" defaultValues={scopeFilters} />;
}

export default HeaderFilters;
