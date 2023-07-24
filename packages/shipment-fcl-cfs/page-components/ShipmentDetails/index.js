import { dynamic } from '@cogoport/next';
import React from 'react';

import useGetShipment from '../../hooks/useGetShipment';
import { useStakeholderCheck } from '../../hooks/useStakeholderCheck';

import styles from './styles.module.css';

const Superadmin = dynamic(() => import('./StakeholdersView/Superadmin'), { ssr: false });
const Kam = dynamic(() => import('./StakeholdersView/BookingAgent'), { ssr: false });
const BookingDesk = dynamic(() => import('./StakeholdersView/BookingDesk'), { ssr: false });
const CostBookingDesk = dynamic(() => import('./StakeholdersView/CostBookingDesk'), { ssr: false });
const LastMileDesk = dynamic(() => import('./StakeholdersView/LastMileDesk'), { ssr: false });
const DocumentDesk = dynamic(() => import('./StakeholdersView/DocumentDesk'), { ssr: false });
const So1So2Ops = dynamic(() => import('./StakeholdersView/So1So2Ops'), { ssr: false });

const SHIPMENT_ADDITIONAL_METHODS = ['main_service', 'documents', 'end_to_end_shipment'];

function ShipmentDetails() {
	const { get } = useGetShipment({ additional_methods: SHIPMENT_ADDITIONAL_METHODS });

	const { activeStakeholder } = useStakeholderCheck();

	switch (activeStakeholder) {
		case 'booking_agent':
			return <Kam get={get} activeStakeholder={activeStakeholder} />;
		case 'booking_desk':
		case 'booking_desk_manager':
			return <BookingDesk get={get} activeStakeholder={activeStakeholder} />;

		case 'costbooking_ops':
		case 'costbooking_manager':
			return <CostBookingDesk get={get} activeStakeholder={activeStakeholder} />;

		case 'lastmile_ops':
		case 'lastmile_ops_manager':
			return <LastMileDesk get={get} activeStakeholder={activeStakeholder} />;

		case 'document_desk':
		case 'document_desk_manager':
			return <DocumentDesk get={get} activeStakeholder={activeStakeholder} />;
		case 'so1_so2_ops':
			return <So1So2Ops get={get} activeStakeholder={activeStakeholder} />;

		case 'admin':
		case 'superadmin':
		case 'credit_control':
		case 'coe_head':
		case 'prod_process_owner':
		case 'tech_super_admin':
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
