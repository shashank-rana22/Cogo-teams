import { useState, useMemo } from 'react';

import LastMileDeskContext from '../context/LastMileDeskContext';
import getLocalStorageVal from '../helpers/getLocalStorageVal';

import Fcl from './Fcl';

function LastMileDesk() {
	const defaultValues = getLocalStorageVal();

	const [filters, setFilters] = useState(defaultValues?.filters);
	const [activeTab, setActiveTab] = useState(defaultValues?.activeTab);
	const [scopeFilters] = useState(defaultValues?.scopeFilters);

	const contextValues = useMemo(() => ({
		activeTab,
		setActiveTab,
		filters,
		setFilters,
		scopeFilters,
	}), [activeTab, setActiveTab, filters, setFilters, scopeFilters]);

	return (
		<LastMileDeskContext.Provider value={contextValues}>
			{activeTab ? <Fcl /> : null}
		</LastMileDeskContext.Provider>
	);
}

export default LastMileDesk;
