import { useState } from 'react';

import getLocalStorageVal from '../helpers/getLocalStorageVal';

import Fcl from './Fcl';

function LastMileDesk() {
	const defaultValues = getLocalStorageVal();
	const [filters, setFilters] = useState(defaultValues?.filters);
	const [activeTab, setActiveTab] = useState(defaultValues?.activeTab);
	const [scopeFilters] = useState(defaultValues?.scopeFilters);

	const stateProps = { activeTab, setActiveTab, filters, setFilters, scopeFilters };

	return activeTab ? <Fcl key={activeTab} stateProps={stateProps} /> : null;
}

export default LastMileDesk;
