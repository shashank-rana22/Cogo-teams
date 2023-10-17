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

const componentMapping = {
	booking_agent         : Kam,
	booking_desk          : BookingDesk,
	booking_desk_manager  : BookingDesk,
	costbooking_ops       : CostBookingDesk,
	costbooking_manager   : CostBookingDesk,
	lastmile_ops          : LastMileDesk,
	lastmile_ops_manager  : LastMileDesk,
	document_desk         : DocumentDesk,
	document_desk_manager : DocumentDesk,
	so1_so2_ops           : So1So2Ops,
	admin                 : Superadmin,
	superadmin            : Superadmin,
	credit_control        : Superadmin,
	coe_head              : Superadmin,
	prod_process_owner    : Superadmin,
	tech_super_admin      : Superadmin,
	default               : () => (
		<h1 className={styles.not_allowed}>
			You are not allowed to visit this page!
		</h1>
	),
};

function ShipmentDetails() {
	const { get } = useGetShipment({ additional_methods: SHIPMENT_ADDITIONAL_METHODS });
	const { activeStakeholder } = useStakeholderCheck();

	const SelectedComponent = componentMapping[activeStakeholder] || componentMapping.default;

	return <SelectedComponent get={get} activeStakeholder={activeStakeholder} />;
}

export default ShipmentDetails;
