import { addDays, subtractDays } from '@cogoport/utils';

const TODAY = new Date();
const ONE = 1;
const TWO = 2;
const THREE = 3;
const FOUR = 4;
const FIVE = 5;

const tabwiseFilters = ({ activeTab = '', isCriticalOn = false }) => {
	const mapping = {
		awaiting_service_provider_confirmation: {
			task_attributes: [
				{
					task            : 'update_container_details',
					status          : 'completed',
					subsidiary_task : {
						task  : 'mark_confirmed',
						state : 'awaiting_service_provider_confirmation',
					},
				},
			],
		},

		confirmed_by_service_provider_import: {
			task_attributes: [
				{
					assigned_stakeholders: 'service_ops2',
				},
				{
					task   : 'update_container_details',
					status : 'completed',
				},
				{
					task   : 'upload_booking_note',
					status : 'completed',
				},
			],
			state: [
				'in_progress',
				'shipment_received',
				'confirmed_by_importer_exporter',
			],
			bl_uploaded: false,
		},

		amendment_requested_by_importer_exporter: {
			task_attributes: [
				{
					...(isCriticalOn ? { status: 'pending' } : {}),
					assigned_stakeholder: 'service_ops2',
				},
			],
			bl_amendment_requested: true,
		},

		do_approval_pending_import: {
			task_attributes: [
				{
					...(isCriticalOn ? { status: 'pending' } : {}),
					assigned_stakeholder: 'service_ops2',
				},
			],
			bl_approval_completed   : true,
			containers_not_gated_in : true,
			service_state           : ['containers_gated_in'],
		},

		vessel_departed_import: {
			task_attributes: [
				{
					assigned_stakeholder: 'service_ops2',
				},
				{
					task   : 'mark_container_gated_in',
					status : 'completed',
				},
				{
					task   : 'mark_vessel_departed',
					status : 'pending',
				},
			],
			bl_approval_completed : true,
			service_state         : ['containers_gated_in'],
		},

		pre_alerts: {
			task_attributes: [
				{
					assigned_stakeholder: 'service_ops2',
					...(isCriticalOn ? { status: 'pending' } : {}),
				},
				{
					task   : 'mark_vessel_departed',
					status : 'completed',
				},
			],
			bl_lading_not_uploaded : true,
			bl_approval_completed  : true,
		},

		agent_invoice: {
			task_attributes: [
				{
					assigned_stakeholder: 'service_ops2',
					...(isCriticalOn ? { status: 'pending' } : {}),
				},
				{
					task   : 'upload_bill_of_lading',
					status : 'completed',
				},
			],
			not_approved_collections: true,
		},

		telex: {
			task_attributes: [
				{
					assigned_stakeholder: 'service_ops2',
				},
				{
					task   : 'mark_vessel_departed',
					status : 'completed',
				},
				{
					task   : 'upload_bill_of_lading',
					status : 'completed',
				},
				{
					task   : 'mark_container_gated_in',
					status : 'completed',
				},
			],

			hbl_mbl_collection_not_completed : true,
			completed_collections            : true,
			bl_approval_completed            : true,
		},

		completed: {
			task_attributes: [

				{
					task   : 'update_mbl_collection_status',
					status : 'completed',
				},
				{
					task   : 'update_hbl_collection_status',
					status : 'completed',
				},
			],
			service_state: ['vessel_arrived', 'containers_gated_out', 'completed'],
		},

		cancelled: {
			state: 'cancelled',
		},

	};

	return mapping[activeTab] || {};
};

const CRITICAL_TABS = {
	confirmed_by_service_provider_import: {
		si_cutoff_less_than : addDays(TODAY, THREE),
		bl_uploaded         : false,
	},
	do_approval_pending_import               : { gate_in_cutoff: addDays(TODAY, ONE) },
	vessel_departed_import                   : { schedule_departure_less_than: TODAY },
	amendment_requested_by_importer_exporter : {
		schedule_departure_less_than : addDays(TODAY, FOUR),
		document_amendment_requested : true,
	},
	pre_alerts    : { schedule_departure_less_than: subtractDays(TODAY, TWO) },
	agent_invoice : { schedule_departure_less_than: subtractDays(TODAY, TWO) },
	telex         : {
		schedule_departure_less_than : subtractDays(TODAY, FIVE),
		schedule_arrival_less_than   : addDays(TODAY, FOUR),
	},
};

const importMapping = {
	tabwiseFilters,
	CRITICAL_TABS,
};

export default importMapping;
