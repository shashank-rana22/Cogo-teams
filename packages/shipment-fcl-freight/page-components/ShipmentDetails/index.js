import { dynamic } from '@cogoport/next';
import React from 'react';

import { useStakeholderCheck } from '../../hooks/useStakeholderCheck';

const Kam = dynamic(() => import('./StakeholdersView/Kam'), { ssr: false });
const Superadmin = dynamic(() => import('./StakeholdersView/Superadmin'), { ssr: false });

function ShipmentDetails() {
	const { activeStakeholder } = useStakeholderCheck();

	switch (activeStakeholder) {
		case 'Kam':
			return <Kam />;
		case 'Superadmin':
		case 'Admin':
		case 'TechSuperadmin':
			return <Superadmin />;
		default:
			return null;
	}
}

export default ShipmentDetails;
