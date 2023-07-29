import { addDays } from '@cogoport/utils';

const TODAY = new Date();
const TWO_DAYS = 2;

const FCL_TABS = [
	'container_pickup',
	'container_gate_in',
	'vessel_departed',
	'vessel_arrived',
	'container_gate_out',
	'container_return',
	'completed',
	'cancelled',
];

export const TABWISE_FILTERS = {
	container_pickup: {
		service_state : 'confirmed_by_service_provider',
		state         : [
			'in_progress',
			'confirmed_by_importer_exporter',
			'shipment_received',
		],
	},
	container_gate_in: {
		service_state : 'containers_gated_in',
		state         : [
			'in_progress',
			'confirmed_by_importer_exporter',
			'shipment_received',
		],
	},
	vessel_departed: {
		service_state : 'vessel_departed',
		state         : [
			'in_progress',
			'confirmed_by_importer_exporter',
			'shipment_received',
		],
	},
	vessel_arrived: {
		service_state : 'vessel_arrived',
		state         : [
			'in_progress',
			'confirmed_by_importer_exporter',
			'shipment_received',
		],
	},
	container_gate_out: {
		service_state : 'containers_gated_out',
		state         : [
			'in_progress',
			'confirmed_by_importer_exporter',
			'shipment_received',
		],
	},
	container_return: {
		task_attributes: [
			{
				task   : ['mark_destination_customs_cleared_at', 'mark_completed'],
				status : 'completed',
				state  : 'containers_gated_out',
			},
			{
				task   : 'update_empty_container_returned_at',
				status : 'pending',
			},
		],
		service_state : 'containers_gated_out',
		state         : [
			'in_progress',
			'confirmed_by_importer_exporter',
			'shipment_received',
		],
	},
	completed: {
		state: 'completed',
	},
	cancelled: {
		state: 'cancelled',
	},
};

export const CRITICAL_TABS = {
	vessel_departed    : { schedule_arrival_less_than: TODAY },
	vessel_arrived     : { schedule_arrival_less_than: addDays(TODAY, TWO_DAYS) },
	container_gate_out : { detention_days: TWO_DAYS },
	container_return   : { detention_days: TWO_DAYS },
};

export default FCL_TABS;
