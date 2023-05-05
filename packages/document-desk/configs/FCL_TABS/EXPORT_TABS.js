import { addDays } from '@cogoport/utils';

const TODAY = new Date();

const TABWISE_FILTERS = ({ activeTab = '', isCriticalOn }) => {
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
		bl_approval_pending: {
			task_attributes: [
				{
					...(isCriticalOn ? { status: 'pending' } : {}),
					assigned_stakeholder: 'service_ops2',
				},
			],
			service_state : ['containers_gated_in'],
			state         : ['in_progress', 'confirmed_by_importer_exporter'],
		},
		completed: {
			service_state: ['vessel_departed', 'vessel_arrived', 'containers_gated_out', 'completed'],
		},
		cancelled: {
			state: 'cancelled',
		},
	};

	return mapping[activeTab] || {};
};

const CRITICAL_TABS = {
	confirmed_by_service_provider : { si_cutoff_less_than: addDays(TODAY, 1) },
	bl_approval_pending           : { schedule_departure_less_than: TODAY },
};

const exportMapping = {
	TABWISE_FILTERS,
	CRITICAL_TABS,
};

export default exportMapping;
