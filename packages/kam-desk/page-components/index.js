import { dynamic } from '@cogoport/next';
import { useState, useMemo } from 'react';

import KamDeskContext from '../context/KamDeskContext';
import getLocalStorageVal from '../helpers/getLocalStorageVal';

const ResolveKamDesk = {
	fcl_freight : dynamic(() => import('./FCL'), { ssr: false }),
	lcl_freight : dynamic(() => import('./LCL'), { ssr: false }),
	air_freight : dynamic(() => import('./AIR'), { ssr: false }),
	surface     : dynamic(() => import('./SURFACE'), { ssr: false }),
	all         : dynamic(() => import('./ALL'), { ssr: false }),
};

function KamDesk() {
	const defaultValues = getLocalStorageVal();

	const [filters, setFilters] = useState(defaultValues?.filters);

	const [shipmentType, setShipmentType] = useState(defaultValues?.shipment_type);

	const [scopeFilters] = useState(defaultValues?.scopeFilters);

	const [activeTab, setActiveTab] = useState(defaultValues?.activeTab);

	const [stepperTab, setStepperTab] = useState(defaultValues?.stepperTab);

	const contextValues = useMemo(() => ({
		shipmentType,
		setShipmentType,
		filters,
		setFilters,
		scopeFilters,
		activeTab,
		setActiveTab,
		stepperTab,
		setStepperTab,
	}), [shipmentType, setShipmentType, filters, setFilters, scopeFilters,
		activeTab, setActiveTab, stepperTab, setStepperTab]);

	const RenderDesk = shipmentType in ResolveKamDesk ? ResolveKamDesk[shipmentType] : null;

	return (
		<KamDeskContext.Provider value={contextValues}>
			{shipmentType ? <RenderDesk activeTab={activeTab} /> : null}
		</KamDeskContext.Provider>
	);
}

export default KamDesk;
