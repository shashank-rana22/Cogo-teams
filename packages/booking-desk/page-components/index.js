import { dynamic } from '@cogoport/next';
import { useState, useEffect, useMemo } from 'react';

import BookingDeskContext from '../context/BookingDeskContext';
import getValidatedStoredValues from '../utils/getValidatedStoredValues';

const ResolveBookingDesk = {
	fcl_freight : dynamic(() => import('./FCL'), { ssr: false }),
	lcl_freight : dynamic(() => import('./LCL'), { ssr: false }),
};

export default function BookingDesk() {
	const [filters, setFilters] = useState(null);
	const [tabState, setTabState] = useState(null);
	const [scopeFilters, setScopeFilters] = useState(null);

	useEffect(() => {
		const defaultValues = getValidatedStoredValues();

		setFilters(defaultValues.filters);
		setTabState(defaultValues.tabState);
		setScopeFilters(defaultValues.scopeFilters);
	}, []);

	const contextValues = useMemo(() => ({
		filters,
		setFilters,
		tabState,
		setTabState,
		scopeFilters,
		setScopeFilters,
	}), [filters, scopeFilters, tabState]);

	const RenderDesk = tabState?.stepperTab in ResolveBookingDesk
		? ResolveBookingDesk[tabState.stepperTab]
		: null;

	if (RenderDesk) {
		return (
			<BookingDeskContext.Provider value={contextValues}>
				<RenderDesk />
			</BookingDeskContext.Provider>
		);
	}
	return null;
}
