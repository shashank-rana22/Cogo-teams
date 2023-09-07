import { addDays, subtractDays } from '@cogoport/utils';

const TODAY = new Date();
const ONE = 1;

const tabwiseFilters = ({ activeTab = '', isCriticalOn }) => {
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
		confirmed_by_service_provider: {
			task_attributes: [
				{
					...(isCriticalOn ? { status: 'pending' } : {}),
					assigned_stakeholder: 'service_ops2',
				},
			],
			service_state: [
				'init',
				'awaiting_service_provider_confirmation',
				'confirmed_by_service_provider',
			],
			state: [
				'in_progress',
				'shipment_received',
				'confirmed_by_importer_exporter',
			],
		},
		do_approval_pending: {
			task_attributes: [
				{
					...(isCriticalOn ? { status: 'pending' } : {}),
					assigned_stakeholder: 'service_ops2',
				},
			],
			service_state : ['containers_gated_in'],
			state         : ['in_progress', 'confirmed_by_importer_exporter'],
		},
		vessel_departed: {
			task_attributes: [
				{
					...(isCriticalOn ? { status: 'pending' } : {}),
					assigned_stakeholder: 'service_ops2',
				},
			],
			service_state : ['vessel_departed'],
			state         : ['in_progress', 'confirmed_by_importer_exporter'],
		},
		completed: {
			service_state: ['vessel_arrived', 'containers_gated_out', 'completed'],
		},
		cancelled: {
			state: 'cancelled',
		},
	};

	return mapping[activeTab] || {};
};

const CRITICAL_TABS = {
	confirmed_by_service_provider : { si_cutoff_less_than: addDays(TODAY, ONE) },
	do_approval_pending           : { schedule_departure_less_than: TODAY },
	vessel_departed               : { schedule_arrival_less_than: subtractDays(TODAY, ONE) },
};

const importMapping = {
	tabwiseFilters,
	CRITICAL_TABS,
};

export default importMapping;
