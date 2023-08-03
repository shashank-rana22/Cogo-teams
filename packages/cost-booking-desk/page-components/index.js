import { dynamic } from '@cogoport/next';
import { useState, useMemo } from 'react';

import CostBookingDeskContext from '../context/CostBookingDeskContext';
import getLocalStorageVal from '../helpers/getLocalStorageVal';

const ResolveCostBookingDesk = {
	fcl_freight : dynamic(() => import('./FCL'), { ssr: false }),
	lcl_freight : dynamic(() => import('./LCL'), { ssr: false }),
	fcl_cfs     : dynamic(() => import('./FCL-CFS'), { ssr: false }),
};

function CostBookingDesk() {
	const defaultValues = getLocalStorageVal();

	const [filters, setFilters] = useState(defaultValues?.filters);
	const [activeTab, setActiveTab] = useState(defaultValues?.activeTab);
	const [shipmentType, setShipmentType] = useState(defaultValues?.shipmentType);
	const [stepperTab, setStepperTab] = useState(defaultValues?.stepperTab);
	const [scopeFilters] = useState(defaultValues?.scopeFilters);

	const contextValues = useMemo(() => ({
		activeTab,
		setActiveTab,
		filters,
		setFilters,
		scopeFilters,
		setShipmentType,
		setStepperTab,
		stepperTab,
		shipmentType,
	}), [activeTab, setActiveTab, filters, setFilters, scopeFilters,
		shipmentType, setShipmentType, stepperTab, setStepperTab]);

	const RenderDesk = shipmentType in ResolveCostBookingDesk
		? ResolveCostBookingDesk[shipmentType]
		: null;

	return (
		<CostBookingDeskContext.Provider value={contextValues}>
			{shipmentType in ResolveCostBookingDesk ? <RenderDesk /> : null}
		</CostBookingDeskContext.Provider>
	);
}

export default CostBookingDesk;
