import { dynamic } from '@cogoport/next';
import { useState, useEffect } from 'react';

import getValidatedStoredValues from '../utils/getValidatedStoredValues';

const ResolveBookingDesk = {
	fcl_freight       : dynamic(() => import('./FCL'), { ssr: false }),
	fcl_freight_local : dynamic(() => import('./FCL-Local'), { ssr: false }),
	lcl_freight       : dynamic(() => import('./LCL'), { ssr: false }),
};

export default function BookingDesk() {
	const [filters, setFilters] = useState(null);
	const [activeTab, setActiveTab] = useState(null);
	const [scopeFilters, setScopeFilters] = useState(null);

	const stateProps = {
		activeTab,
		setActiveTab,
		filters,
		setFilters,
		scopeFilters,
	};

	useEffect(() => {
		const defaultValues = getValidatedStoredValues();

		setFilters(defaultValues.filters);
		setActiveTab(defaultValues.activeTab);
		setScopeFilters(defaultValues.scopeFilters);
	}, []);

	const RenderDesk = filters?.shipment_type in ResolveBookingDesk
		? ResolveBookingDesk[filters.shipment_type]
		: null;

	if (RenderDesk) {
		return (
			<div key={filters.shipment_type}>
				<RenderDesk stateProps={stateProps} />
			</div>
		);
	}
	return null;
}
