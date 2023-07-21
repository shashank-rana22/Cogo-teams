import getServiceWisePayload from './getServiceWisePayload';

const getSearchResultsPayload = ({
	spot_search_id = '',
	additionalFormInfo,
	detail,
	service_name = '',
	rateCardData = {},
}) => {
	const {
		destination_cargo_handling_type = '',
		origin_cargo_handling_type = '',
	} = additionalFormInfo;

	const rate_card_id = rateCardData?.id;

	const tradeType = service_name.includes('export') ? 'export' : 'import';

	if (service_name === 'export_transportation') {
		return {
			spot_search_id,
			service:
				origin_cargo_handling_type === 'stuffing_at_factory'
					? 'trailer_freight'
					: 'ftl_freight',
			...(origin_cargo_handling_type === 'stuffing_at_factory'
				? {
					trailer_freight_services: getServiceWisePayload({
						additionalFormInfo,
						detail,
						service_name: 'trailer_freight',
						tradeType,
					}),
				}
				: {
					ftl_freight_services: getServiceWisePayload({
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
				destination_cargo_handling_type === 'stuffing_at_factory'
					? 'trailer_freight'
					: 'ftl_freight',
			...(destination_cargo_handling_type === 'stuffing_at_factory'
				? {
					trailer_freight_services: getServiceWisePayload({
						additionalFormInfo,
						detail,
						service_name: 'trailer_freight',
						tradeType,
					}),
				}
				: {
					ftl_freight_services: getServiceWisePayload({
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
		detail,
		service_name: finalServiceName,
		tradeType,
	});

	return {
		rate_card_id,
		spot_search_id,
		service                          : finalServiceName,
		[`${finalServiceName}_services`] : serviceWiseValues,
	};
};

export default getSearchResultsPayload;
