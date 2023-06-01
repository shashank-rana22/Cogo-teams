import { dynamic, useRouter } from '@cogoport/next';
import { useState, useMemo, useCallback } from 'react';

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
	const router = useRouter();

	const defaultValues = getLocalStorageVal();

	const [filters, setFilters] = useState(defaultValues?.filters);

	const [shipmentType, setShipmentType] = useState(defaultValues?.shipment_type);

	const [scopeFilters] = useState(defaultValues?.scopeFilters);

	const [activeTab, setActiveTab] = useState(defaultValues?.activeTab);

	const [stepperTab, setStepperTab] = useState(defaultValues?.stepperTab);

	const handleVersionChange = useCallback(() => {
		const newPathname = `${router.asPath}`;
		window.location.replace(newPathname);
		localStorage.setItem('kam_desk_version', 'v1');
	}, [router.asPath]);

	const contextValues = useMemo(() => ({
		shipmentType,
		setShipmentType,
		filters,
		setFilters,
		scopeFilters,
		handleVersionChange,
		activeTab,
		setActiveTab,
		stepperTab,
		setStepperTab,
	}), [shipmentType, setShipmentType, filters, setFilters, scopeFilters,
		handleVersionChange, activeTab, setActiveTab, stepperTab, setStepperTab]);

	const RenderDesk = shipmentType in ResolveKamDesk ? ResolveKamDesk[shipmentType] : null;

	return (
		<KamDeskContext.Provider value={contextValues}>
			{shipmentType ? <RenderDesk /> : null}
		</KamDeskContext.Provider>
	);
}

export default KamDesk;
