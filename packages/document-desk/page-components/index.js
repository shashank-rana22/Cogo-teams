import { dynamic } from '@cogoport/next';
import { useState, useMemo } from 'react';

import DocumentDeskContext from '../context/DocumentDeskContext';
import getLocalStorageVal from '../helpers/getLocalStorageVal';

const ResolveDocumentDesk = {
	fcl_freight : dynamic(() => import('./Fcl'), { ssr: false }),
	lcl_freight : dynamic(() => import('./Lcl'), { ssr: false }),
};

export default function DocumentDesk() {
	const defaultValues = getLocalStorageVal();

	const [filters, setFilters] = useState(defaultValues?.filters);
	const [stepperTab, setStepperTab] = useState(defaultValues?.stepperTab);
	const [activeTab, setActiveTab] = useState(defaultValues?.activeTab);
	const [scopeFilters] = useState(defaultValues?.scopeFilters);
	const [shipmentType, setShipmentType] = useState(defaultValues?.shipment_type);

	const contextValues = useMemo(() => ({
		activeTab,
		setActiveTab,
		filters,
		setFilters,
		scopeFilters,
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
		stepperTab,
		setStepperTab,
		shipmentType,
		setShipmentType,
	]);

	const RenderDesk = shipmentType in ResolveDocumentDesk ? ResolveDocumentDesk[shipmentType] : null;

	return (
		<DocumentDeskContext.Provider value={contextValues}>
			{shipmentType ? <RenderDesk /> : null}
		</DocumentDeskContext.Provider>
	);
}
