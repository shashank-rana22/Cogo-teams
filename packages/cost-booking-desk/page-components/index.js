import { useGetScopeOptions } from '@cogoport/scope-select';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import getLocalStorageSetters from '../helpers/geLocalStorageSetters';
import getValidatedStoredValues from '../utils/getValidatedStoredValues';

import FclFreight from './FCL';
import styles from './styles.module.css';

function CostBookingDesk() {
	const [filters, setFilters] = useState({});
	const [activeTab, setActiveTab] = useState('assigned');
	const [scopeFilters, setScopeFilters] = useState(null);

	// const scopeData = useGetScopeOptions();
	// const defaultValues = getLocalStorageSetters({ scopeData });

	const stateProps = { activeTab, setActiveTab, filters, setFilters, scopeFilters };

	// useEffect(() => {
	// 	const defaultValues = getValidatedStoredValues();

	// 	setFilters(defaultValues.filters);
	// 	setActiveTab(defaultValues.activeTab);
	// 	setScopeFilters(defaultValues.scopeFilters);
	// }, []);

	return (
		<div>
			<FclFreight stateProps={stateProps} />
		</div>
	);
}
export default CostBookingDesk;
