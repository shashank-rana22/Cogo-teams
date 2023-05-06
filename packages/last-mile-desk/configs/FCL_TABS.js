import { addDays } from '@cogoport/utils';

const TODAY = new Date();

const FCL_TABS = [
	'vessel_departed',
	'vessel_arrived',
	'container_gated_out',
	'awaiting_container_return',
	'container_returned',
	'completed'];

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
	completed: {
		state: 'completed',
	},
};

export const CRITICAL_TABS = {
	vessel_departed           : { schedule_arrival_less_than: TODAY },
	vessel_arrived            : { schedule_arrival_less_than: addDays(TODAY, 2) },
	container_gated_out       : { detention_days: 2 },
	awaiting_container_return : { detention_days: 2 },
	container_returned        : { detention_days: 0 },
};

export default FCL_TABS;
