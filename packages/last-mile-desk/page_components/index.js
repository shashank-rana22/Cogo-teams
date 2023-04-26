import { useRouter } from 'next/router';
import { useState, useMemo, useCallback } from 'react';

import LastMileDeskContext from '../context/LastMileDeskContext';
import getLocalStorageVal from '../helpers/getLocalStorageVal';

import Fcl from './Fcl';

function LastMileDesk() {
	const router = useRouter();
	const defaultValues = getLocalStorageVal();

	const [filters, setFilters] = useState(defaultValues?.filters);
	const [activeTab, setActiveTab] = useState(defaultValues?.activeTab);
	const [scopeFilters] = useState(defaultValues?.scopeFilters);

	const handleVersionChange = useCallback(() => {
		const newPathname = `${router.asPath}`;
		window.location.replace(newPathname);
		localStorage.setItem('last_mile_desk_version', 'v1');
	}, [router.asPath]);

	if (defaultValues?.lastMileDeskVersion === 'v1') handleVersionChange();

	const contextValues = useMemo(() => ({
		activeTab,
		setActiveTab,
		filters,
		setFilters,
		scopeFilters,
		handleVersionChange,
	}), [activeTab, setActiveTab, filters, setFilters, scopeFilters, handleVersionChange]);

	return (
		<LastMileDeskContext.Provider value={contextValues}>
			{activeTab ? <Fcl /> : null}
		</LastMileDeskContext.Provider>
	);
}

export default LastMileDesk;
