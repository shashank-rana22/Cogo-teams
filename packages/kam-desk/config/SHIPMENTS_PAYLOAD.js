import { addDays, subtractDays } from '@cogoport/utils';

const TODAY = new Date();
const DAYS_DIFFERENCE_COUNT_FOR_THREE_DAYS = 3;
const DAYS_DIFFERENCE_COUNT_FOR_TOMORROW = 1;
const DAYS_DIFFERENCE_COUNT_FOR_YESTERDAY = 1;
const scheduleDepartureInThreeDays = {
	schedule_departure_less_than:
	addDays(TODAY, DAYS_DIFFERENCE_COUNT_FOR_THREE_DAYS),
};
const scheduleDepartureYesterday = {
	schedule_departure_less_than:
	subtractDays(TODAY, DAYS_DIFFERENCE_COUNT_FOR_YESTERDAY),
};
const scheduleDepartureTomorrow = { schedule_departure_less_than: addDays(TODAY, DAYS_DIFFERENCE_COUNT_FOR_TOMORROW) };
const scheduleArrivalToday = { schedule_arrival_less_than: TODAY };

export const CRITICAL_TABS = {
	fcl_freight: {
		export_import: {
			mark_confirmed           : scheduleDepartureInThreeDays,
			upload_booking_note      : scheduleDepartureInThreeDays,
			update_container_details : scheduleDepartureInThreeDays,
			confirm_with_shipper     : scheduleDepartureInThreeDays,
			list_task_pending        : scheduleDepartureYesterday,
			document_approval        : scheduleDepartureTomorrow,
			vessel_departed          : scheduleArrivalToday,
			vessel_arrived           : { detention_days: 2 },
		},
	},
	lcl_freight: {
		export_import: {
			confirm_booking      : scheduleDepartureInThreeDays,
			list_task_pending    : scheduleDepartureYesterday,
			upload_carting_order : scheduleDepartureInThreeDays,
			bl_document_approval : scheduleDepartureTomorrow,
			do_document_approval : scheduleDepartureTomorrow,
			vessel_departed      : scheduleArrivalToday,
			vessel_arrived       : { detention_days: 2 },
		},
	},
};

const tabPayload = {
	fcl_freight: {
		export_import: {
			mark_confirmed: {
				state  : ['shipment_received'],
				export : [
					{
						task                 : 'mark_confirmed',
						status               : 'pending',
						assigned_stakeholder : 'booking_agent',
					},
				],
				import: [
					{
						task                 : 'mark_confirmed',
						status               : 'pending',
						assigned_stakeholder : 'booking_agent',
					},
				],
			},
			upload_booking_note: {
				export: [
					{
						task   : 'upload_booking_note',
						status : 'pending',
					},
				],
				import: [
					{
						task   : 'upload_booking_note',
						status : 'pending',
					},
				],
			},
			update_container_details: {
				export: [
					{
						task   : 'update_container_details',
						status : 'pending',
					},
				],
			},
			list_task_pending: {
				export: [
					{
						task   : ['upload_packing_list', 'upload_si', 'upload_invoice'],
						status : 'pending',
					},
				],
				import: [
					{
						task   : ['upload_packing_list', 'upload_si', 'upload_invoice'],
						status : 'pending',
					},
				],
			},
			confirm_with_shipper: {
				import: [
					{
						task                 : 'confirm_with_shipper',
						status               : ['pending'],
						assigned_stakeholder : 'origin_booking_agent',
					},
				],
			},
			confirm_cargo_readiness: {
				import: [
					{
						task                 : 'confirm_cargo_readiness',
						status               : ['pending'],
						assigned_stakeholder : 'origin_booking_agent',
					},
				],
			},
			document_approval: {
				state               : ['in_progress', 'confirmed_by_importer_exporter'],
				bl_approval_pending : true,

			},
			vessel_departed: {
				state         : 'in_progress',
				service_state : 'vessel_departed',
			},
			vessel_arrived: {
				state         : 'in_progress',
				service_state : 'vessel_arrived',
			},
			completed: {
				state: 'completed',
			},
			cancelled: {
				state: 'cancelled',
			},
		},
		fcl_customs: {
			mark_confirmed: {
				state           : 'shipment_received',
				task_attributes : [
					{
						task   : 'mark_confirmed',
						status : 'pending',
					},
				],
			},
			mark_completed: {
				task_attributes: [
					{
						task   : 'mark_completed',
						status : 'pending',
					},
				],
			},
			completed : { state: 'completed' },
			cancelled : { state: 'cancelled' },
		},
		fcl_cfs: {
			mark_confirmed: {
				state           : 'shipment_received',
				task_attributes : [
					{
						task   : 'mark_confirmed',
						status : 'pending',
					},
				],
			},
			mark_completed: {
				task_attributes: [
					{
						task   : 'mark_completed',
						status : 'pending',
					},
				],
			},
			completed : { state: 'completed' },
			cancelled : { state: 'cancelled' },
		},
		fcl_local: {
			mark_confirmed: {
				state           : 'shipment_received',
				task_attributes : [
					{
						task   : 'mark_confirmed',
						status : 'pending',
					},
				],
			},
			update_container_details: {
				task_attributes: [
					{
						task   : 'update_container_details',
						status : 'pending',
					},
				],
			},
			document_approval: {
				bl_approval_pending : 'pending',
				do_approval_pending : 'pending',
			},
			completed : { state: 'completed' },
			cancelled : { state: 'cancelled' },
		},
	},

	lcl_freight: {
		export_import: {
			confirm_booking: {
				state  : ['shipment_received'],
				export : [
					{
						task                 : 'confirm_booking',
						status               : 'pending',
						assigned_stakeholder : 'booking_agent',
					},
				],
				import: [
					{
						task                 : 'confirm_booking',
						status               : 'pending',
						assigned_stakeholder : 'booking_agent',
					},
				],
			},
			list_task_pending: {
				export: [
					{
						task   : ['upload_si', 'upload_invoice'],
						status : 'pending',
					},
				],
				import: [
					{
						task   : ['upload_si', 'upload_invoice'],
						status : 'pending',
					},
				],
			},
			upload_carting_order: {
				export: [
					{
						task   : 'upload_carting_order',
						status : 'pending',
					},
				],
				import: [
					{
						task   : 'upload_carting_order',
						status : 'pending',
					},
				],
			},
			bl_document_approval: {
				state               : 'in_progress',
				bl_approval_pending : true,
			},
			vessel_departed: {
				state         : 'in_progress',
				service_state : 'vessel_departed',
			},
			vessel_arrived: {
				state         : 'in_progress',
				service_state : 'vessel_arrived',
			},
			completed: {
				state: 'completed',
			},
			cancelled: {
				state: 'cancelled',
			},
		},
		lcl_customs: {
			mark_confirmed: {
				state           : 'shipment_received',
				task_attributes : [
					{
						task   : 'mark_confirmed',
						status : 'pending',
					},
				],
			},
			in_progress: {
				task_attributes: [
					{
						task   : 'mark_completed',
						status : 'pending',
					},
				],
			},
			cancelled : { state: 'cancelled' },
			completed : { state: 'completed' },
		},
	},

	air_freight: {
		air_freight: {
			ongoing: {
				state: [
					'shipment_received',
					'confirmed_by_importer_exporter',
					'in_progress',
				],
			},
			triggered_pending_invoices: {
				state: [
					'shipment_received',
					'confirmed_by_importer_exporter',
					'in_progress',
					'completed',
				],
				triggered_pending_invoices: true,
			},
			completed : { state: 'completed' },
			cancelled : { state: 'cancelled' },
		},
		air_customs: {
			ongoing: {
				state: [
					'shipment_received',
					'confirmed_by_importer_exporter',
					'in_progress',
				],
			},
			triggered_pending_invoices: {
				state: [
					'shipment_received',
					'confirmed_by_importer_exporter',
					'in_progress',
					'completed',
				],
				triggered_pending_invoices: true,
			},
			completed : { state: 'completed' },
			cancelled : { state: 'cancelled' },
		},
		air_freight_local: {
			ongoing: {
				state: [
					'shipment_received',
					'confirmed_by_importer_exporter',
					'in_progress',
				],

			},
			triggered_pending_invoices: {
				state: [
					'shipment_received',
					'confirmed_by_importer_exporter',
					'in_progress',
					'completed',
				],
				triggered_pending_invoices: true,
			},
			completed : { state: 'completed' },
			cancelled : { state: 'cancelled' },
		},
		domestic_air_freight: {
			ongoing: {
				state: [
					'shipment_received',
					'confirmed_by_importer_exporter',
					'in_progress',
				],
			},
			triggered_pending_invoices: {
				state: [
					'shipment_received',
					'confirmed_by_importer_exporter',
					'in_progress',
					'completed',
				],
				triggered_pending_invoices: true,
			},
			completed : { state: 'completed' },
			cancelled : { state: 'cancelled' },
		},
	},

	surface: {
		ftl_freight: {
			confirm_booking: {
				state           : ['shipment_received'],
				task_attributes : {
					task   : 'mark_confirmed',
					status : 'pending',
				},
			},
			confirmation_on_services_taken: {
				state           : ['confirmed_by_importer_exporter', 'in_progress'],
				task_attributes : {
					task   : 'confirmation_on_services_taken',
					status : 'pending',
				},
			},
			confirmation_of_booking_with_service_provider: {
				state           : ['confirmed_by_importer_exporter', 'in_progress'],
				service_state   : 'confirmed_by_service_provider',
				task_attributes : {
					task   : 'confirmation_of_booking_with_service_provider',
					status : 'pending',
				},
			},
			cargo_picked_up: {
				state           : ['confirmed_by_importer_exporter', 'in_progress'],
				service_state   : 'cargo_picked_up',
				task_attributes : {
					task   : 'cargo_picked_up_at',
					status : 'completed',
				},
			},
			cargo_dropped_pod_pending: {
				state           : ['confirmed_by_importer_exporter', 'in_progress'],
				service_state   : 'cargo_dropped',
				task_attributes : {
					task   : 'mark_completed',
					status : 'completed',
				},
			},
			pod_uploaded: {
				state           : ['confirmed_by_importer_exporter', 'in_progress'],
				service_state   : 'completed',
				task_attributes : {
					task   : 'upload_proof_of_delivery',
					status : 'completed',
				},
			},
			completed : { state: 'completed' },
			cancelled : { state: 'cancelled' },
		},
		ltl_freight: {
			confirm_booking: {
				state           : ['shipment_received'],
				task_attributes : {
					task   : 'mark_confirmed',
					status : 'pending',
				},
			},
			confirmation_on_services_taken: {
				state           : ['confirmed_by_importer_exporter', 'in_progress'],
				task_attributes : {
					task   : 'confirmation_on_services_taken',
					status : 'pending',
				},
			},
			confirm_cargo_details: {
				state           : ['confirmed_by_importer_exporter', 'in_progress'],
				service_state   : 'confirmed_by_service_provider',
				task_attributes : {
					task   : 'confirm_cargo_details',
					status : 'pending',
				},
			},
			cargo_picked_up: {
				state           : ['confirmed_by_importer_exporter', 'in_progress'],
				service_state   : 'cargo_picked_up',
				task_attributes : {
					task   : 'confirmation_on_services_taken',
					status : 'completed',
				},
			},
			cargo_dropped_pod_pending: {
				state           : ['confirmed_by_importer_exporter', 'in_progress'],
				service_state   : 'cargo_picked_up',
				task_attributes : {
					task   : 'upload_proof_of_delivery',
					status : 'completed',
				},
			},
			completed : { state: 'completed' },
			cancelled : { state: 'cancelled' },
		},
		rail_domestic_freight: {
			confirm_booking: {
				state           : ['shipment_received'],
				task_attributes : {
					task   : 'confirm_booking',
					status : 'pending',
				},
			},
			upload_commercial_invoice: {
				state           : ['confirmed_by_importer_exporter'],
				task_attributes : {
					task   : 'upload_commercial_invoice',
					status : 'pending',
				},
			},
			eway_bill_extension : { ewb_expiration: true	},
			invoice_pending     : { invoice_status: 'pending' },
			invoice_reviewed    : { invoice_status: 'reviewed' },
			invoice_approved    : { invoice_status: 'approved' },
			completed           : { state: 'completed' },
			cancelled           : { state: 'cancelled' },
		},
		haulage_freight: {
			ongoing: {
				state: ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress'],
			},
			completed : { state: 'completed' },
			cancelled : { state: 'cancelled' },
		},
	},

	all: {
		ongoing: {
			state: ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress'],
		},
		completed : { state: ['completed'] },
		cancelled : { state: ['cancelled'] },
	},
};

export default tabPayload;
