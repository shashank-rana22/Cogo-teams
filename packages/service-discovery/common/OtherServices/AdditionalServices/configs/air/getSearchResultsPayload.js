import getServiceWisePayload from './getServiceWisePayload';

const getSearchResultsPayload = ({
	spot_search_id = '',
	additionalFormInfo,
	detail,
	service_name = '',
	rateCardData = {},
}) => {
	const {
		export_transportation_pickup_type = '',
		import_transportation_pickup_type = '',
	} = additionalFormInfo;

	const rate_card_id = rateCardData?.id;

	const tradeType = service_name.includes('export') ? 'export' : 'import';

	if (service_name === 'export_transportation') {
		return {
			spot_search_id,
			service:
			export_transportation_pickup_type === 'ltl_freight'
				? 'ltl_freight'
				: 'ftl_freight',
			...(export_transportation_pickup_type === 'ltl_freight'
				? {
					ltl_freight_services_attributes: getServiceWisePayload({
						additionalFormInfo,
						detail,
						service_name: 'ltl_freight',
						tradeType,
					}),
				}
				: {
					ftl_freight_services_attributes: getServiceWisePayload({
						additionalFormInfo,
						detail,
						service_name: 'ftl_freight',
						tradeType,
					}),
				}),
		};
	}

	if (service_name === 'import_transportation') {
		return {
			spot_search_id,
			service:
				import_transportation_pickup_type === 'ltl_freight'
					? 'ltl_freight'
					: 'ftl_freight',
			...(import_transportation_pickup_type === 'ltl_freight'
				? {
					ltl_freight_services_attributes: getServiceWisePayload({
						additionalFormInfo,
						detail,
						service_name: 'ltl_freight',
						tradeType,
					}),
				}
				: {
					ftl_freight_services_attributes: getServiceWisePayload({
						additionalFormInfo,
						detail,
						service_name: 'ftl_freight',
						tradeType,
					}),
				}),
		};
	}

	let finalServiceName = service_name.replace('import_', '');

	finalServiceName = finalServiceName.replace('export_', '');

	const serviceWiseValues = getServiceWisePayload({
		additionalFormInfo,
		detail       : { ...rateCardData, ...detail },
		service_name : finalServiceName,
		tradeType,
	});

	return {
		rate_card_id,
		spot_search_id,
		service                                     : finalServiceName,
		[`${finalServiceName}_services_attributes`] : serviceWiseValues,
	};
};

export default getSearchResultsPayload;
