import { dynamic } from '@cogoport/next';
import { useGetScopeOptions } from '@cogoport/scope-select';
import { useState, useEffect } from 'react';

import getValidatedStoredValues from '../utils/getValidatedStoredValues';

import styles from './styles.module.css';

const FCLDesk = dynamic(() => import('./FCL'), { ssr: false });
const FCLLocalDesk = dynamic(() => import('./FCL-Local'), { ssr: false });
const LCLDesk = dynamic(() => import('./LCL'), { ssr: false });

const ResolveBookingDesk = {
	fcl_freight       : FCLDesk,
	fcl_freight_local : FCLLocalDesk,
	lcl_freight       : LCLDesk,
};

export default function BookingDesk() {
	const [filters, setFilters] = useState(null);
	const [activeTab, setActiveTab] = useState(null);
	const [scopeFilters, setScopeFilters] = useState(null);

	const { scopeData } = useGetScopeOptions();

	const stateProps = { activeTab, setActiveTab, filters, setFilters, scopeFilters };

	useEffect(() => {
		const defaultValues = getValidatedStoredValues(scopeData);

		setFilters(defaultValues.filters);
		setActiveTab(defaultValues.activeTab);
		setScopeFilters(defaultValues.scopeFilters);
	}, []);

	const RenderDesk = filters?.shipment_type in ResolveBookingDesk ? ResolveBookingDesk[filters.shipment_type] : null;

	if (RenderDesk) {
		return (
			<div
				key={filters.shipment_type}
				className={styles.component_enter_active}
			>
				<RenderDesk stateProps={stateProps} className={styles.component_exit_active} />
			</div>
		);
	}
	return null;
}
