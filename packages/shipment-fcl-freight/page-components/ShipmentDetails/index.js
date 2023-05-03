import { dynamic } from '@cogoport/next';
import React from 'react';

import userLoggedIn from '../../helpers/booking-shipper-kam-user';
import useGetBuyers from '../../hooks/useGetBuyers';
import useGetShipment from '../../hooks/useGetShipment';
import { useStakeholderCheck } from '../../hooks/useStakeholderCheck';

import styles from './styles.module.css';

const Superadmin = dynamic(() => import('./StakeholdersView/Superadmin'), { ssr: false });
const DKam = dynamic(() => import('./StakeholdersView/ConsigneeShipperBookingAgent'), { ssr: false });
const Kam = dynamic(() => import('./StakeholdersView/BookingAgent'), { ssr: false });
const BookingDesk = dynamic(() => import('./StakeholdersView/BookingDesk'), { ssr: false });
const LastMileDesk = dynamic(() => import('./StakeholdersView/LastMileDesk'), { ssr: false });

const shipment_additional_methods = ['main_service', 'documents'];

function ShipmentDetails() {
	const { get } = useGetShipment({ additional_methods: shipment_additional_methods });

	const { shipment_data } = get;

	const { data } = useGetBuyers({ shipment_id: shipment_data?.id });

	const orgIds = Object.keys(data);
	const { activeStakeholder } = useStakeholderCheck();

	const { kamLoggedIn } = userLoggedIn({ orgIds, shipment_data, activeStakeholder });

	switch (activeStakeholder) {
		case 'booking_agent':
			if (kamLoggedIn === 'importer_exporter_kam') {
				return <Kam get={get} activeStakeholder="booking_agent" />;
			}
			return <DKam get={get} activeStakeholder="consignee_shipper_booking_agent" />;

		case 'booking_desk':
			return <BookingDesk get={get} activeStakeholder="booking_desk" />;
		// case 'lastmile_ops':
		// 	return <LastMileDesk get={get} activeStakeholder="lastmile_ops" />;
		case 'admin':
		case 'superadmin':
			return <LastMileDesk get={get} activeStakeholder="lastmile_ops" />;
		default:
			return (
				<h1 className={styles.not_allowed}>
					You are not allowed to visit this page!
				</h1>
			);
	}
}

export default ShipmentDetails;
