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
	const FILTERED_SERVICES = [];
	Object.keys(services || {}).forEach((key) => {
		if (services?.[key]?.service_type === 'fcl_freight') {
			FILTERED_SERVICES.push({
				...services?.[key],
				id: key,
			});
		}
	});

	return FILTERED_SERVICES;
};

const specificRatePayload = (services = {}, values = {}) => {
	const SPECIFIC_RATE_PAYLOAD = [];

	const fcl_freight_services = getFclServices(services);

	(fcl_freight_services || []).forEach((service) => {
		(SUBSIDIARY_SERVICES || []).forEach((item) => {
			const { code = '', value = '' } = item || {};

			const daysCount = Number(values?.[value]);

			if (daysCount) {
				const subsidiary_payload = {
					code,
					service_type        : service?.service_type,
					status              : 'active',
					service_id          : service?.id,
					total_rate_quantity : daysCount,
				};

				SPECIFIC_RATE_PAYLOAD.push(subsidiary_payload);
			}
		});
	});

	return SPECIFIC_RATE_PAYLOAD;
};

const formatDaysPayload = ({ services = {}, values }) => {
	const subsidiary_payload = specificRatePayload(services, values);

	return subsidiary_payload;
};

export default formatDaysPayload;
