import { dynamic } from '@cogoport/next';
import React from 'react';

import userLoggedIn from '../../helpers/booking-shipper-kam-user';
import useGetBuyers from '../../hooks/useGetBuyers';
import useGetShipment from '../../hooks/useGetShipment';
import { useStakeholderCheck } from '../../hooks/useStakeholderCheck';

const Superadmin = dynamic(() => import('./StakeholdersView/Superadmin'), { ssr: false });
const DKam = dynamic(() => import('./StakeholdersView/DKam'), { ssr: false });
const Kam = dynamic(() => import('./StakeholdersView/Kam'), { ssr: false });

const shipment_additional_methods = ['main_service', 'documents'];

function ShipmentDetails() {
	const { get } = useGetShipment({ additional_methods: shipment_additional_methods });

	const { shipment_data } = get;

	const { data = {} } = useGetBuyers({ shipment_id: shipment_data?.id });

	const orgIds = Object.keys(data);
	const { activeStakeholder } = useStakeholderCheck();

	const { kamLoggedIn } = userLoggedIn({ orgIds, shipment_data, activeStakeholder });

	switch (activeStakeholder) {
		case 'Kam':
			if (kamLoggedIn === 'ieKam') {
				return <Kam get={get} />;
			}
			return <DKam get={get} />;
		case 'Superadmin':
		case 'Admin':
		case 'TechSuperadmin':
			return <Superadmin get={get} />;
		default:
			return (
				<h1
					style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
				>
					You are not allowed to visit this page!
				</h1>
			);
	}
}

export default ShipmentDetails;
