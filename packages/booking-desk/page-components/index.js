import { dynamic } from '@cogoport/next';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';

import getValidatedStoredValues from '../utils/getValidatedStoredValues';

import styles from './styles.module.css';

const ResolveBookingDesk = {
	fcl_freight       : dynamic(() => import('./FCL'), { ssr: false }),
	fcl_freight_local : dynamic(() => import('./FCL-Local'), { ssr: false }),
	lcl_freight       : dynamic(() => import('./LCL'), { ssr: false }),
};

export default function BookingDesk() {
	const [filters, setFilters] = useState(null);
	const [activeTab, setActiveTab] = useState(null);
	const [scopeFilters, setScopeFilters] = useState(null);

	const router = useRouter();

	const handleVersionChange = useCallback(() => {
		const newPathname = `${router.asPath}`;
		window.location.replace(newPathname);
		localStorage.setItem('booking_desk_version', 'v1');
	}, [router.asPath]);

	const stateProps = { activeTab, setActiveTab, filters, setFilters, scopeFilters, handleVersionChange };

	useEffect(() => {
		const defaultValues = getValidatedStoredValues();

		setFilters(defaultValues.filters);
		setActiveTab(defaultValues.activeTab);
		setScopeFilters(defaultValues.scopeFilters);

		if (defaultValues.bookingDeskVersion === 'v1') handleVersionChange();
	}, [handleVersionChange]);

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
