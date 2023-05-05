import { dynamic } from '@cogoport/next';
import { useRouter } from 'next/router';
import { useState, useMemo, useCallback } from 'react';

import CostBookingDeskContext from '../context/CostBookingDeskContext';
import getLocalStorageVal from '../helpers/getLocalStorageVal';

const ResolveCostBookingDesk = {
	fcl_freight : dynamic(() => import('./FCL'), { ssr: false }),
	lcl_freight : dynamic(() => import('./LCL'), { ssr: false }),
};

function CostBookingDesk() {
	const router = useRouter();
	const defaultValues = getLocalStorageVal();

	const [filters, setFilters] = useState(defaultValues?.filters);
	const [activeTab, setActiveTab] = useState(defaultValues?.activeTab);
	const [shipmentType, setShipmentType] = useState(defaultValues?.shipmentType);
	const [stepperTab, setStepperTab] = useState(defaultValues?.stepperTab);
	const [scopeFilters] = useState(defaultValues?.scopeFilters);

	const handleVersionChange = useCallback(() => {
		const newPathname = `${router.asPath}`;
		window.location.replace(newPathname);
		localStorage.setItem('last_mile_desk_version', 'v1');
	}, [router.asPath]);

	if (defaultValues?.costBookingDeskVersion === 'v1') handleVersionChange();

	const contextValues = useMemo(() => ({
		activeTab,
		setActiveTab,
		filters,
		setFilters,
		scopeFilters,
		handleVersionChange,
		setShipmentType,
		setStepperTab,
		stepperTab,
		shipmentType,
	}), [activeTab, setActiveTab, filters, setFilters, scopeFilters, handleVersionChange,
		shipmentType, setShipmentType, stepperTab, setStepperTab]);

	const RenderDesk = shipmentType in ResolveCostBookingDesk
		? ResolveCostBookingDesk[shipmentType]
		: null;

	return (
		<CostBookingDeskContext.Provider value={contextValues}>
			{shipmentType in ResolveCostBookingDesk ?	<RenderDesk /> : null}
		</CostBookingDeskContext.Provider>
	);
}
export default CostBookingDesk;
