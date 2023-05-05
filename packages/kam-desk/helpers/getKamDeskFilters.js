import tabPayload from '../config/SHIPMENTS_PAYLOAD';

export default function getKamDeskFilters({ filters, kamDeskContextValues }) {
	const { activeTab, shipmentType, stepperTab } = kamDeskContextValues || {};
	const { page, ...restFilters } = filters || {};

	const payload = tabPayload?.[shipmentType]?.[stepperTab]?.[activeTab] || {};

	const finalFilters = { ...payload, ...restFilters };
	let additionalMethods = ['pagination'];

	if (shipmentType === 'fcl_freight') {
		if (activeTab === 'list_task_pending') {
			additionalMethods = [...additionalMethods, 'tasks'];
		}

		if (activeTab === 'upload_booking_note') {
			additionalMethods = [...additionalMethods, 'booking_status'];
		}

		if (['mark_confirmed', 'upload_booking_note', 'upload_shipping_order'].includes(activeTab)) {
			additionalMethods = [...additionalMethods, 'booking_preference'];
		}
	}

	return {
		finalFilters,
		additionalMethods,
	};
}
