import { dynamic } from '@cogoport/next';
import { useState, useEffect } from 'react';

import getValidatedStoredValues from '../utils/getValidatedStoredValues';

const FCLDesk = dynamic(() => import('./FCL'), { ssr: false });
const FCLLocalDesk = dynamic(() => import('./FCL-Local'), { ssr: false });
const LCLDesk = dynamic(() => import('./LCL'), { ssr: false });

function ResolveBookingDesk({ stateProps }) {
	switch (stateProps.filters.shipment_type) {
		case 'fcl_freight': return <FCLDesk stateProps={stateProps} />;
		case 'fcl_freight_local': return <FCLLocalDesk stateProps={stateProps} />;
		case 'lcl_freight': return <LCLDesk stateProps={stateProps} />;
		default: return <div>No Shipment Type was selected</div>;
	}
}

export default function BookingDesk() {
	const [filters, setFilters] = useState(null);
	const [activeTab, setActiveTab] = useState(null);

	const stateProps = { activeTab, setActiveTab, filters, setFilters };

	useEffect(() => {
		const localStoredValues = JSON.parse(localStorage.getItem('booking_desk_stored_values') || '{}');

		const defaultValues = getValidatedStoredValues(localStoredValues);

		setFilters(defaultValues.filters);
		setActiveTab(defaultValues.activeTab);
	}, []);

	return activeTab ? <ResolveBookingDesk stateProps={stateProps} /> : null;
}
