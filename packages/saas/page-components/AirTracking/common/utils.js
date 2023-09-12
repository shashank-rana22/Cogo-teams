import { FILTER_KEYS, FILTER_KEY_TO_ID } from './constants';

const prepareFilters = (filters, filters_data) => {
	const FINAL_FILTERS = {};

	Object.keys(filters).forEach((key) => {
		if (key === FILTER_KEYS.AIR_LINES) {
			FINAL_FILTERS[FILTER_KEY_TO_ID[key]] = filters[key];
		} else if (key === FILTER_KEYS.SHIPPER || key === FILTER_KEYS.CONSIGNEE) {
			FINAL_FILTERS[FILTER_KEY_TO_ID[key]] = [];

			const pocKeys = filters[key];
			const pocDetailsList = filters_data.poc_details || [];
			pocKeys.forEach((pocKey) => {
				const saasSubscriptionIds = pocDetailsList
					.filter((item) => item.saas_shipment_poc_id === pocKey)
					.map((item) => item.saas_container_subscription_id);

				FINAL_FILTERS[FILTER_KEY_TO_ID[key]] = FINAL_FILTERS[FILTER_KEY_TO_ID[key]].concat(saasSubscriptionIds);
			});
		} else {
			FINAL_FILTERS.id = filters[key];
		}
	});

	return FINAL_FILTERS;
};

export { prepareFilters };
