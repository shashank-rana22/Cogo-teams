import getServiceWisePayload from './getServiceWisePayload';

const getCheckoutPayload = ({
	checkout_id,
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
			id: checkout_id,
			service:
				origin_cargo_handling_type === 'stuffing_at_factory'
					? 'haulage_freight'
					: 'ftl_freight',
			...(origin_cargo_handling_type === 'stuffing_at_factory'
				? {
					haulage_freight_services_attributes: getServiceWisePayload({
						additionalFormInfo,
						detail,
						service_name : 'haulage_freight',
						rateCardData,
						tradeType    : service_name.includes('export') ? 'export' : 'import',
					}),
				}
				: {
					ftl_freight_services_attributes: getServiceWisePayload({
						additionalFormInfo,
						detail,
						service_name : 'ftl_freight',
						rateCardData,
						tradeType    : service_name.includes('export') ? 'export' : 'import',
					}),
				}),
		};
	}

	if (service_name === 'import_transportation') {
		return {
			id: checkout_id,
			service:
				destination_cargo_handling_type !== 'destuffing_at_dock'
					? 'haulage_freight'
					: 'ftl_freight',
			...(destination_cargo_handling_type !== 'destuffing_at_dock'
				? {
					haulage_freight_services_attributes: getServiceWisePayload({
						additionalFormInfo,
						detail,
						service_name : 'haulage_freight',
						rateCardData,
						tradeType    : service_name.includes('export') ? 'export' : 'import',
					}),
				}
				: {
					ftl_freight_services_attributes: getServiceWisePayload({
						additionalFormInfo,
						detail,
						service_name : 'ftl_freight',
						rateCardData,
						tradeType    : service_name.includes('export') ? 'export' : 'import',
					}),
				}),
		};
	}

	let finalServiceName = service_name.replace('import_', '');

	finalServiceName = finalServiceName.replace('export_', '');

	const tradeType = service_name.includes('export') ? 'export' : 'import';

	const serviceWiseValues = getServiceWisePayload({
		additionalFormInfo,
		detail,
		service_name: finalServiceName,
		rateCardData,
		tradeType,
	});

	return {
		id                                          : checkout_id,
		service                                     : finalServiceName,
		[`${finalServiceName}_services_attributes`] : serviceWiseValues,
	};
};

export default getCheckoutPayload;
