import { useState, useEffect } from 'react';

import getValidatedStoredValues from '../utils/getValidatedStoredValues';

import FclFreight from './FCL';
import styles from './styles.module.css';

function CostBookingDesk() {
	const [filters, setFilters] = useState(null);
	const [activeTab, setActiveTab] = useState(null);
	const [scopeFilters, setScopeFilters] = useState(null);

	const stateProps = { activeTab, setActiveTab, filters, setFilters, scopeFilters };

	useEffect(() => {
		const defaultValues = getValidatedStoredValues();

		setFilters(defaultValues.filters);
		setActiveTab(defaultValues.activeTab);
		setScopeFilters(defaultValues.scopeFilters);
	}, []);

	return (
	// <div
	// 	key={filters.shipment_type}
	// 	className={styles.component_enter_active}
	// >
	// 	<FclFreight activeTab={activeTab} setActiveTab={setActiveTab} />
	// </div>
		<div>
			<FclFreight activeTab={activeTab} setActiveTab={setActiveTab} />
		</div>
	);
}
export default CostBookingDesk;
