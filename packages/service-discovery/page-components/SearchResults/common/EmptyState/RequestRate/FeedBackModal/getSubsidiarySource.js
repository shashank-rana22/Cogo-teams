const SUBSIDIARY_SERVICES = {
	EDT : 'origin_detention',
	DET : 'destination_detention',
	DEA : 'destination_demurrage',
	EDE : 'origin_demurrage',
};

const getSubsidiarySource = ({ service_data = {}, data = {} }) => {
	const allServices = data?.service_rates;
	const service_id = service_data?.service_id;
	let subsidiary_service = {};

	Object.keys(allServices || {}).forEach((item) => {
		if (service_id === item) {
			subsidiary_service = {
				...allServices[item],
				service_id: item,
			};
		}
	});

	const subsidiary_key = SUBSIDIARY_SERVICES?.[service_data?.code];

	const subsidiary_code_data = subsidiary_service?.[subsidiary_key];

	return {
		specificity_type    : subsidiary_code_data?.specificity_type || 'rate_specific',
		preferred_free_days : subsidiary_code_data?.free_limit,
		shipping_line_ids   : [subsidiary_service?.shipping_line_id],
		service_id          : subsidiary_service?.service_id,
		free_days_type      : subsidiary_key,
	};
};

export default getSubsidiarySource;
