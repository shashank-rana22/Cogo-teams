import { addDays, subtractDays } from '@cogoport/utils';

const TODAY = new Date();
const TWO = 2;
const ONE = 1;
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

		upload_shipping_instruction: {
			task_attributes: [
				{
					assigned_taskholder: 'service_ops2',
				},
				{
					task   : 'upload_si',
					status : 'completed',
				},
				{
					task   : 'update_si_filled_at',
					status : 'pending',
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

		upload_draft_bil_of_lading: {
			task_attributes: [
				{
					...(isCriticalOn ? { status: 'pending' } : {}),
					assigned_stakeholder: 'service_ops2',
				},
				{
					task   : 'update_si_filled_at',
					status : 'completed',
				}, {
					task   : 'upload_draft_bill_of_lading',
					status : 'pending',
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

		confirmed_by_service_provider: {
			task_attributes: [
				{
					assigned_stakeholder: 'service_ops2',
				},
				{
					task   : 'upload_draft_bill_of_lading',
					status : 'completed',
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
	upload_shipping_instruction   : { si_cutoff_less_than: addDays(TODAY, TWO) },
	upload_draft_bil_of_lading    : { si_filed_at_less_than: subtractDays(TODAY, ONE) },
	confirmed_by_service_provider : { si_cutoff_less_than: addDays(TODAY, ONE) },
	bl_approval_pending           : { schedule_departure_less_than: TODAY },
};

const exportMapping = {
	tabwiseFilters,
	CRITICAL_TABS,
};

export default exportMapping;
