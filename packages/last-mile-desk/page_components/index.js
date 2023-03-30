import { useGetScopeOptions } from '@cogoport/scope-select';
import { useState, useEffect } from 'react';

import getLocalStorageVal from '../helpers/getLocalStorageVal';

import Fcl from './Fcl';

function LastMileDesk() {
	const [filters, setFilters] = useState(null);
	const [activeTab, setActiveTab] = useState(null);
	const [scopeFilters, setScopeFilters] = useState(null);

	const { scopeData } = useGetScopeOptions({});

	const stateProps = { activeTab, setActiveTab, filters, setFilters, scopeFilters };
	const defaultValues = getLocalStorageVal(scopeData);

	useEffect(() => {
		setFilters(defaultValues.filters);
		setActiveTab(defaultValues.activeTab);
		setScopeFilters(defaultValues.scopeFilters);
	}, []);

	return <Fcl stateProps={stateProps} />;
}

export default LastMileDesk;
