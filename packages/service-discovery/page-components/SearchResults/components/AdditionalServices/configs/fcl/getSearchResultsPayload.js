import getServiceWisePayload from './getServiceWisePayload';

const getSearchResultsPayload = ({
	spot_search_id = '',
	additionalFormInfo,
	detail,
	service_name = '',
	rateCardData,
}) => {
	const {
		destination_cargo_handling_type = '',
		origin_cargo_handling_type = '',
	} = additionalFormInfo;

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
						rateCardData,
					}),
				}
				: {
					ftl_freight_services: getServiceWisePayload({
						additionalFormInfo,
						detail,
						service_name: 'ftl_freight',
						rateCardData,
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
						rateCardData,
					}),
				}
				: {
					ftl_freight_services: getServiceWisePayload({
						additionalFormInfo,
						detail,
						service_name: 'ftl_freight',
						rateCardData,
					}),
				}),
		};
	}

	const serviceWiseValues = getServiceWisePayload({
		additionalFormInfo,
		detail,
		service_name,
		rateCardData,
	});

	return {
		spot_search_id,
		service                      : service_name,
		[`${service_name}_services`] : serviceWiseValues,
	};
};

export default getSearchResultsPayload;
