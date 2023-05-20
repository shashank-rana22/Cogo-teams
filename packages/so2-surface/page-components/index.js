import { useRouter } from 'next/router';
import { useState, useCallback, useMemo } from 'react';

import DashboardContext from '../context/DashboardContext';
import getLocalStorageVal from '../helpers/getLocalStorageVal';

import FTL from './FTL';

export default function SO2Surface() {
	const defaultValues = getLocalStorageVal();
	const router = useRouter();

	const [filters, setFilters] = useState(defaultValues?.filters);
	const [stepperTab, setStepperTab] = useState(defaultValues?.stepperTab);
	const [activeTab, setActiveTab] = useState(defaultValues?.activeTab);
	const [scopeFilters] = useState(defaultValues?.scopeFilters);

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
	}), [activeTab, setActiveTab, filters, setFilters, scopeFilters, handleVersionChange, stepperTab, setStepperTab]);

	return (
		<DashboardContext.Provider value={contextValues}>
			{activeTab ? <FTL /> : null}
		</DashboardContext.Provider>
	);
}
