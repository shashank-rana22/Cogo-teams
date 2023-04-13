import { ShipmentDetailContext } from '@cogoport/context';
import { useRequest } from '@cogoport/request';
import { useContext } from 'react';

export default function useListShipmentCancellationReasons() {
	const { shipment_data } = useContext(ShipmentDetailContext);
	const { id } = shipment_data || {};

	const [{ loading }] = useRequest({
		url    : 'list_shipment_cancellation_reasons',
		method : 'GET',
		params : { id },
	});

	return {
		reasons: [
			{
				label : 'I Want To Modify My Booking',
				value : 'i_want_to_modify_my_booking',
			},
			{
				label : 'My Cargo Is Delayed',
				value : 'my_cargo_is_delayed',
			},
			{
				label : 'I Have Received A Better Quotation/Offer',
				value : 'i_have_received_a_better_quotation/offer',
			},
			{
				label : 'There Is An Issue With My Booking Note',
				value : 'there_is_an_issue_with_my_booking_note',
			},
			{
				label : 'I Have An Issue With Trucking/Customs Service',
				value : 'i_have_an_issue_with_trucking/customs_service',
			},
			{
				label : 'Have An Issue With Pickup Or Drop Service',
				value : 'have_an_issue_with_pickup_or_drop_service',
			},
			{
				label : 'Requirements Changed',
				value : 'requirements_changed',
			},
			{
				label : 'All Containers Moved To Another Shipment',
				value : 'all_containers_moved_to_another_shipment',
			},
			{
				label : 'Change In Shipment Requirements',
				value : 'change_in_shipment_requirements',
			},
			{
				label : 'Delays In Booking Note Availability/Do Availability',
				value : 'delays_in_booking_note_availability/DO_availability',
			},
			{
				label : 'Stuffing Delays',
				value : 'stuffing_delays',
			},
			{
				label : 'Shipper Not Responding',
				value : 'shipper_not_responding',
			},
			{
				label : 'Shipper Not Accepting Price Increase',
				value : 'shipper_not_accepting_price_increase',
			},
			{
				label : 'Trucker/Cha Delayed Or Not Available',
				value : 'trucker/CHA_delayed_or_not_available',
			},
			{
				label : 'Cargo Not Ready',
				value : 'cargo_not_ready',
			},
			{
				label : 'Cancelled By The Consignee',
				value : 'cancelled_by_the_consignee',
			},
			{
				label : 'Customer Unreachable',
				value : 'customer_unreachable',
			},
			{
				label : 'Cut Off Missed',
				value : 'cut_off_missed',
			},
			{
				label : 'Container Damaged/Poor Quality',
				value : 'container_damaged/poor_quality',
			},
			{
				label : 'Container Unavailable/Other Issues Related To Container',
				value : 'container_unavailable/other_issues_related_to_container',
			},
			{
				label : 'Schedule Not Available',
				value : 'schedule_not_available',
			},
			{
				label : 'Preferred Line Not Available',
				value : 'preferred_line_not_available',
			},
			{
				label : 'Free Days Issue',
				value : 'free_days_issue',
			},
			{
				label : 'Cargo Rejected',
				value : 'cargo_rejected',
			},
		],
		reasonsLoading: loading,
	};
}
