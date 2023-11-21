import getServiceWisePayload from './getServiceWisePayload';

const getCheckoutPayload = ({
	checkout_id,
	additionalFormInfo,
	detail,
	service_name = '',
}) => {
	const {
		export_transportation_pickup_type = '',
		import_transportation_pickup_type = '',
	} = additionalFormInfo;

	if (service_name === 'export_transportation') {
		return {
			id: checkout_id,
			service:
			export_transportation_pickup_type === 'ltl_freight'
				? 'ltl_freight'
				: 'ftl_freight',
			...(export_transportation_pickup_type === 'ltl_freight'
				? {
					ltl_freight_services_attributes: getServiceWisePayload({
						additionalFormInfo,
						detail,
						service_name : 'ltl_freight',
						tradeType    : 'export',
					}),
				}
				: {
					ftl_freight_services_attributes: getServiceWisePayload({
						additionalFormInfo,
						detail,
						service_name : 'ftl_freight',
						tradeType    : 'export',
					}),
				}),
		};
	}

	if (service_name === 'import_transportation') {
		return {
			id: checkout_id,
			service:
				import_transportation_pickup_type === 'ltl_freight'
					? 'ltl_freight'
					: 'ftl_freight',
			...(import_transportation_pickup_type === 'ltl_freight'
				? {
					ltl_freight_services_attributes: getServiceWisePayload({
						additionalFormInfo,
						detail,
						service_name : 'ltl_freight',
						tradeType    : 'import',
					}),
				}
				: {
					ftl_freight_services_attributes: getServiceWisePayload({
						additionalFormInfo,
						detail,
						service_name : 'ftl_freight',
						tradeType    : 'import',
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
		tradeType,
	});

	return {
		id                                          : checkout_id,
		service                                     : finalServiceName,
		[`${finalServiceName}_services_attributes`] : serviceWiseValues,
	};
};

export default getCheckoutPayload;
