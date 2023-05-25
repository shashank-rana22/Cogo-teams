import { dynamic, useRouter } from '@cogoport/next';
import { useState, useCallback, useMemo } from 'react';

import DocumentDeskContext from '../context/DocumentDeskContext';
import getLocalStorageVal from '../helpers/getLocalStorageVal';

const ResolveDocumentDesk = {
	fcl_freight : dynamic(() => import('./Fcl'), { ssr: false }),
	lcl_freight : dynamic(() => import('./Lcl'), { ssr: false }),
};

export default function DocumentDesk() {
	const defaultValues = getLocalStorageVal();
	const router = useRouter();

	const [filters, setFilters] = useState(defaultValues?.filters);
	const [stepperTab, setStepperTab] = useState(defaultValues?.stepperTab);
	const [activeTab, setActiveTab] = useState(defaultValues?.activeTab);
	const [scopeFilters] = useState(defaultValues?.scopeFilters);
	const [shipmentType, setShipmentType] = useState(defaultValues?.shipment_type);

	const handleVersionChange = useCallback(() => {
		const newPathname = `${router.asPath}`;
		window.location.replace(newPathname);
		localStorage.setItem('document_desk_version', 'v1');
	}, [router.asPath]);

	const contextValues = useMemo(() => ({
		activeTab,
		setActiveTab,
		filters,
		setFilters,
		scopeFilters,
		handleVersionChange,
		stepperTab,
		setStepperTab,
		shipmentType,
		setShipmentType,
	}), [
		activeTab,
		setActiveTab,
		filters,
		setFilters,
		scopeFilters,
		handleVersionChange,
		stepperTab,
		setStepperTab,
		shipmentType,
		setShipmentType,
	]);

	const RenderDesk = shipmentType in ResolveDocumentDesk ? ResolveDocumentDesk[shipmentType] : null;

	console.log(shipmentType, 'shipmentType 3333');
	return (
		<DocumentDeskContext.Provider value={contextValues}>
			{shipmentType ? <RenderDesk /> : null}
		</DocumentDeskContext.Provider>
	);
}
