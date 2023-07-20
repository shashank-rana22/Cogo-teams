import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const formatRates = ({ selectedRate, service_type_prop, servicesList }) => {
	if (!selectedRate) return {};
	const service_type = service_type_prop || 'air_freight_service';

	const primary_service = (servicesList || []).find(
		(service) => service.service_type === service_type,
	) || {};
	const origin_local = (servicesList || []).find(
		(service) => service.service_type === 'air_freight_local_service'
			&& service.trade_type === 'export',
	) || {};
	const destination_local = (servicesList || []).find(
		(service) => service.service_type === 'air_freight_local_service'
			&& service.trade_type === 'import',
	) || {};

	if (
		service_type === 'air_freight_service'
	) {
		const { data } = selectedRate || {};
		const rate = data[GLOBAL_CONSTANTS.zeroth_index] || {};

		return {
			id                : selectedRate.id,
			primary_service,
			origin_local,
			destination_local,
			[rate.service_id] : {
				service_provider_id : rate?.service_provider_id,
				airline_id          : rate?.airline_id,
				line_items:
					rate && rate.line_items
						? rate.line_items.map((item) => ({
							code     : item.code,
							name     : item.name,
							currency : item.currency,
							price    : item.price,
							unit     : item.unit,
							quantity : item.quantity,
						}))
						: undefined,
			},
			[origin_local?.id]: {
				service_provider_id : rate?.service_provider_id,
				airline_id          : rate?.airline_id,
				line_items:
					rate && rate?.origin_locals?.line_items
						? rate.line_items.map((item) => ({
							code     : item.code,
							name     : item.name,
							currency : item.currency,
							price    : item.price,
							unit     : item.unit,
							quantity : item.quantity,
						}))
						: undefined,
			},
			[destination_local?.id]: {
				service_provider_id : rate?.service_provider_id,
				airline_id          : rate?.airline_id,
				line_items:
					rate && rate?.destination_locals?.line_items
						? rate.line_items.map((item) => ({
							code     : item.code,
							name     : item.name,
							currency : item.currency,
							price    : item.price,
							unit     : item.unit,
							quantity : item.quantity,
						}))
						: undefined,
			},
		};
	}

	const { data } = selectedRate || {};
	const rate = data[GLOBAL_CONSTANTS.zeroth_index] || {};
	return {
		primary_service,
		id                : selectedRate.id,
		[rate.service_id] : {
			service_provider_id: rate.service_provider_id,
			line_items:
					rate && rate.line_items
						? rate.line_items.map((item) => ({
							code     : item.code,
							name     : item.name,
							price    : item.price,
							currency : item.currency,
							unit     : item.unit,
							quantity : item.quantity,
						}))
						: undefined,
		},
	};
};

export default formatRates;
