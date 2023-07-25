import { dynamic } from '@cogoport/next';
import { useState, useEffect, useMemo } from 'react';

import IGMDeskContext from '../context/IGMDeskContext';
import getValidatedStoredValues from '../utils/getValidatedStoredValues';

const ResolveIgmDesk = {
	fcl_freight: dynamic(() => import('./FCL'), { ssr: false }),
};

export default function IGMDesk() {
	const [filters, setFilters] = useState(null);
	const [tabState, setTabState] = useState(null);

	useEffect(() => {
		const defaultValues = getValidatedStoredValues();

		setFilters(defaultValues.filters);
		setTabState(defaultValues.tabState);
	}, []);

	const contextValues = useMemo(() => ({
		filters,
		setFilters,
		tabState,
		setTabState,
	}), [filters, tabState]);

	const RenderDesk = tabState?.activeTab
		? ResolveIgmDesk.fcl_freight
		: null;

	if (!RenderDesk) {
		return null;
	}

	return (
		<IGMDeskContext.Provider value={contextValues}>
			<RenderDesk />
		</IGMDeskContext.Provider>
	);
}
