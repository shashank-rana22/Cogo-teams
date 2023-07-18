const SUBSIDIARY_SERVICES = [
	{
		code       : 'EDT',
		value      : 'origin_detention',
		trade_type : 'export',
	},
	{
		code       : 'DET',
		value      : 'destination_detention',
		trade_type : 'import',
	},
	{
		code       : 'DEA',
		value      : 'destination_demurrage',
		trade_type : 'import',
	},
	{
		code       : 'EDE',
		value      : 'origin_demurrage',
		trade_type : 'export',
	},
];

const getFclServices = (services) => {
	const filtered_services = [];
	Object.keys(services || {}).forEach((key) => {
		if (services?.[key]?.service_type === 'fcl_freight') {
			filtered_services.push({
				...services?.[key],
				id: key,
			});
		}
	});

	return filtered_services;
};

const specificRatePayload = (service_rates, values) => {
	const specific_rate_payload = [];

	const fcl_freight_services = getFclServices(service_rates);

	(fcl_freight_services || []).forEach((service) => {
		(SUBSIDIARY_SERVICES || []).forEach((item) => {
			const { code = '', value = '' } = item || {};
			if (values?.[value]) {
				const subsidiary_payload = {
					code,
					service_type        : service?.service_type,
					status              : 'active',
					service_id          : service?.id,
					total_rate_quantity : Number(values?.[value]),
				};

				specific_rate_payload.push(subsidiary_payload);
			}
		});
	});

	return specific_rate_payload;
};

const formatDaysPayload = ({ service_rates = {}, values }) => {
	const subsidiary_payload = specificRatePayload(service_rates, values);

	return subsidiary_payload;
};

export default formatDaysPayload;
