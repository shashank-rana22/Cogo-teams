import { dynamic } from '@cogoport/next';
import React from 'react';

import useGetShipment from '../../hooks/useGetShipment';
import { useStakeholderCheck } from '../../hooks/useStakeholderCheck';

import styles from './styles.module.css';

const Superadmin = dynamic(() => import('./StakeholdersView/Superadmin'), { ssr: false });

const BookingDesk = dynamic(() => import('./StakeholdersView/BookingDesk'), { ssr: false });
const shipment_additional_methods = ['main_service', 'conatiners'];

function ShipmentDetails() {
	const { get } = useGetShipment({ additional_methods: shipment_additional_methods });

	const { activeStakeholder } = useStakeholderCheck();

	switch (activeStakeholder) {
		case 'booking_desk':
		case 'booking_desk_manager':
			return <BookingDesk get={get} activeStakeholder={activeStakeholder} />;
		case 'admin':
		case 'superadmin':
		case 'credit_control':
			return <Superadmin get={get} activeStakeholder={activeStakeholder} />;
		default:
			return (
				<h1 className={styles.not_allowed}>
					You are not allowed to visit this page!
				</h1>
			);
	}
}

export default ShipmentDetails;
