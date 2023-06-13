import { addDays } from '@cogoport/utils';

const TODAY = new Date();
const TWO_DAYS = 2;
const ZERO_DAYS = 0;

const FCL_TABS = [
	'vessel_departed',
	'vessel_arrived',
	'container_gated_out',
	'awaiting_container_return',
	'container_returned',
	'service_completed',
	'completed',
	'cancelled',
];

export const TABWISE_FILTERS = {
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
	container_gated_out: {
		service_state : 'containers_gated_out',
		state         : [
			'in_progress',
			'confirmed_by_importer_exporter',
			'shipment_received',
		],
	},
	awaiting_container_return: {
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
	container_returned: {
		task_attributes: [
			{
				task   : 'update_empty_container_returned_at',
				status : 'completed',
			},
		],
		state: [
			'in_progress',
			'confirmed_by_importer_exporter',
			'shipment_received',
		],
	},
	service_completed: {
		service_state : 'completed',
		state         : 'in_progress',
	},
	completed: {
		state: 'completed',
	},
	cancelled: {
		state: 'cancelled',
	},
};

export const CRITICAL_TABS = {
	vessel_departed           : { schedule_arrival_less_than: TODAY },
	vessel_arrived            : { schedule_arrival_less_than: addDays(TODAY, TWO_DAYS) },
	container_gated_out       : { detention_days: TWO_DAYS },
	awaiting_container_return : { detention_days: TWO_DAYS },
	container_returned        : { detention_days: ZERO_DAYS },
};

export default FCL_TABS;
