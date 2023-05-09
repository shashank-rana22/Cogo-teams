import tabPayload from '../config/SHIPMENTS_PAYLOAD';

export default function getKamDeskFilters({ filters, kamDeskContextValues }) {
	const { activeTab, shipmentType, stepperTab } = kamDeskContextValues || {};
	const { page, date_type, dateRange, startDate, endDate, ...restFilters } = filters || {};

	const payload = tabPayload?.[shipmentType]?.[stepperTab]?.[activeTab]
    || tabPayload?.[shipmentType]?.[activeTab]
    || {};

	let finalFilters = { ...payload, ...restFilters };
	let additionalMethods = ['pagination'];

	if (shipmentType === 'fcl_freight') {
		if (activeTab === 'list_task_pending') {
			additionalMethods = [...additionalMethods, 'tasks'];
		}

		if (activeTab === 'upload_booking_note') {
			additionalMethods = [...additionalMethods, 'booking_status'];
		}

		if (
			[
				'mark_confirmed',
				'upload_booking_note',
				'upload_shipping_order',
			].includes(activeTab)
		) {
			additionalMethods = [...additionalMethods, 'booking_preference'];
		}
	}

	if (date_type) {
		finalFilters = {
			...finalFilters,
			[`${date_type}_greater_than`] : startDate,
			[`${date_type}_less_than`]    : endDate,
		};
	}

	return {
		finalFilters,
		additionalMethods,
	};
}
