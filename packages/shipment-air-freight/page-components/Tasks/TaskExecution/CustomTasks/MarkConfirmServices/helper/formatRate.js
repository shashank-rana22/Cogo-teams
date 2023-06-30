import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const DEFAULT_QUANTITY_VALUE = 1;
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
		&& selectedRate.source === 'system_rate'
	) {
		const { data } = selectedRate || {};
		const rate = data[GLOBAL_CONSTANTS.zeroth_index] || {};

		return {
			id                   : selectedRate.id,
			primary_service,
			origin_local,
			destination_local,
			[primary_service.id] : {
				service_provider_id : rate.service_provider_id,
				airline_id          : rate.airline_id,
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
		};
	}
	if (
		service_type === 'air_freight_service'
		&& selectedRate.source === 'flash_booking'
	) {
		const { data } = selectedRate || {};
		const rate = data[GLOBAL_CONSTANTS.zeroth_index] || {};

		return {
			id                   : selectedRate.id,
			primary_service,
			origin_local,
			destination_local,
			[primary_service.id] : {
				service_provider_id : rate.service_provider_id,
				airline_id          : rate.airline_id,
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
		};
	}
	if (
		service_type === 'air_customs_service'
		&& selectedRate.source === 'flash_booking'
	) {
		const { data } = selectedRate || {};
		const rate = data[GLOBAL_CONSTANTS.zeroth_index] || {};
		return {
			primary_service,
			id                   : selectedRate.id,
			[primary_service.id] : {
				service_provider_id: rate.service_provider_id,
				line_items:
					rate && rate.line_items
						? rate.line_items.map((item) => ({
							code     : item.code,
							name     : item.name,
							price    : item.price,
							currency : item.currency,
							unit     : item.unit,
							quantity : primary_service.containers_count
									|| primary_service.quantity
									|| DEFAULT_QUANTITY_VALUE,
						}))
						: undefined,
			},
		};
	}
	return {};
};

export default formatRates;
