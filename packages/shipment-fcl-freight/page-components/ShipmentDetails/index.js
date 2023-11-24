import { dynamic } from '@cogoport/next';
import React from 'react';

import userLoggedIn from '../../helpers/booking-shipper-kam-user';
import useGetShipment from '../../hooks/useGetShipment';
import { useStakeholderCheck } from '../../hooks/useStakeholderCheck';

import styles from './styles.module.css';

const Superadmin = dynamic(() => import('./StakeholdersView/Superadmin'), { ssr: false });
const DKam = dynamic(() => import('./StakeholdersView/ConsigneeShipperBookingAgent'), { ssr: false });
const Kam = dynamic(() => import('./StakeholdersView/BookingAgent'), { ssr: false });
const BookingDesk = dynamic(() => import('./StakeholdersView/BookingDesk'), { ssr: false });
const CostBookingDesk = dynamic(() => import('./StakeholdersView/CostBookingDesk'), { ssr: false });
const LastMileDesk = dynamic(() => import('./StakeholdersView/LastMileDesk'), { ssr: false });
const DocumentDesk = dynamic(() => import('./StakeholdersView/DocumentDesk'), { ssr: false });
const DocumentDeskManager = dynamic(() => import('./StakeholdersView/DocumentDeskManager'), { ssr: false });
const So1So2Ops = dynamic(() => import('./StakeholdersView/So1So2Ops'), { ssr: false });
const BookingDeskManager = dynamic(() => import('./StakeholdersView/BookingDeskManager'), { ssr: false });
const LastMileDeskManager = dynamic(() => import('./StakeholdersView/LastMileDeskManager'), { ssr: false });
const DataOperations = dynamic(() => import('./StakeholdersView/DataOperations'), { ssr: false });

const SHIPMENT_ADDITIONAL_METHODS = ['main_service',
	'documents',
	'end_to_end_shipment',
	'containers',
	'rollover_shipments',
	'advance_documents',
	'remaining_closure_days',
];

function ShipmentDetails() {
	const { get } = useGetShipment({ additional_methods: SHIPMENT_ADDITIONAL_METHODS });

	const { shipment_data } = get;

	const { activeStakeholder } = useStakeholderCheck();

	const { kamLoggedIn } = userLoggedIn({ shipment_data });

	const stakeholdersComponents = {
		booking_agent            : kamLoggedIn === 'booking_agent' ? Kam : DKam,
		booking_agent_manager    : kamLoggedIn === 'booking_agent' ? Kam : DKam,
		sales_agent              : Kam,
		booking_desk             : BookingDesk,
		booking_desk_manager     : BookingDeskManager,
		costbooking_ops          : CostBookingDesk,
		costbooking_manager      : CostBookingDesk,
		lastmile_ops             : LastMileDesk,
		lastmile_ops_manager     : LastMileDeskManager,
		document_desk            : DocumentDesk,
		document_desk_manager    : DocumentDesk,
		document_control_manager : DocumentDesk,
		document_control_lead    : DocumentDesk,
		supplier_relations_head  : DocumentDeskManager,
		so1_so2_ops              : So1So2Ops,
		admin                    : Superadmin,
		superadmin               : Superadmin,
		credit_control           : Superadmin,
		prod_process_owner       : Superadmin,
		tech_super_admin         : Superadmin,
		corporate_owner          : Superadmin,
		operation_manager        : Superadmin,
		coe_head                 : Superadmin,
		finance_superadmin       : Superadmin,
		finops_manager           : Superadmin,
		so1_revenue_desk         : Superadmin,
		data_superadmin          : Superadmin,
		kam_admin                : Kam,
		so2_executive            : DocumentDesk,
		data_associate           : DataOperations,
		default                  : () => (
			<h1 className={styles.not_allowed}>
				You are not allowed to visit this page!
			</h1>
		),
	};

	const ComponentToRender = stakeholdersComponents[activeStakeholder] || stakeholdersComponents.default;

	return (
		<ComponentToRender get={get} activeStakeholder={activeStakeholder} />
	);
}

export default ShipmentDetails;
