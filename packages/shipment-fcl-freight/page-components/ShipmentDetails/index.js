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
const So1So2Ops = dynamic(() => import('./StakeholdersView/So1So2Ops'), { ssr: false });
const BookingDeskManager = dynamic(() => import('./StakeholdersView/BookingDeskManager'), { ssr: false });
const LastMileDeskManager = dynamic(() => import('./StakeholdersView/LastMileDeskManager'), { ssr: false });

const SHIPMENT_ADDITIONAL_METHODS = ['main_service',
	'documents',
	'end_to_end_shipment',
	'containers',
	'rollover_shipments',
];

function ShipmentDetails() {
	const { get } = useGetShipment({ additional_methods: SHIPMENT_ADDITIONAL_METHODS });

	const { shipment_data } = get;

	const { activeStakeholder } = useStakeholderCheck();

	const { kamLoggedIn } = userLoggedIn({ shipment_data });

	switch (activeStakeholder) {
		case 'booking_agent':
			if (kamLoggedIn === 'booking_agent') {
				return <Kam get={get} activeStakeholder={activeStakeholder} />;
			}
			return <DKam get={get} activeStakeholder="consignee_shipper_booking_agent" />;

		case 'booking_desk':
			return <BookingDesk get={get} activeStakeholder={activeStakeholder} />;
		case 'booking_desk_manager':
			return <BookingDeskManager get={get} activeStakeholder={activeStakeholder} />;

		case 'costbooking_ops':
		case 'costbooking_manager':
			return <CostBookingDesk get={get} activeStakeholder={activeStakeholder} />;

		case 'lastmile_ops':
			return <LastMileDesk get={get} activeStakeholder={activeStakeholder} />;
		case 'lastmile_ops_manager':
			return <LastMileDeskManager get={get} activeStakeholder={activeStakeholder} />;

		case 'document_desk':
		case 'document_desk_manager':
			return <DocumentDesk get={get} activeStakeholder={activeStakeholder} />;
		case 'so1_so2_ops':
			return <So1So2Ops get={get} activeStakeholder={activeStakeholder} />;

		case 'admin':
		case 'superadmin':
		case 'credit_control':
		case 'prod_process_owner':
		case 'tech_super_admin':
		case 'corporate_owner':
		case 'operation_manager':
		case 'coe_head':
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
