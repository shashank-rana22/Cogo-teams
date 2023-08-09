import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const formatRates = (selectedRate, service_type_prop) => {
	if (!selectedRate) return {};

	const ONE = 1;
	const service_type = service_type_prop || 'fcl_freight_service';
	let formattedData = {};

	if (service_type === 'fcl_freight_service') {
		selectedRate.forEach((rate) => {
			formattedData = {
				...formattedData,
				[rate?.service_id]: {
					service_provider_id : rate?.id,
					shipping_line_id    : rate?.data?.[GLOBAL_CONSTANTS.zeroth_index]?.shipping_line_id,
					line_items:
						rate && rate?.data?.[GLOBAL_CONSTANTS.zeroth_index]?.line_items
							? rate?.data?.[GLOBAL_CONSTANTS.zeroth_index]?.line_items.map((item) => ({
								code     : item.code,
								name     : item.name,
								price    : item.price,
								currency : item.currency,
								unit     : item.unit,
								quantity : item?.quantity || ONE,
							}))
							: undefined,
				},
				[rate?.data?.[GLOBAL_CONSTANTS.zeroth_index]?.origin_locals?.service_id]: {
					service_provider_id : rate.id,
					shipping_line_id    : rate?.data?.[GLOBAL_CONSTANTS.zeroth_index]?.shipping_line_id,
					line_items:
						rate && rate?.data?.[GLOBAL_CONSTANTS.zeroth_index]?.origin_locals?.line_items
							? rate?.data?.[GLOBAL_CONSTANTS.zeroth_index]?.origin_locals?.line_items.map((item) => ({
								code     : item.code,
								name     : item.name,
								currency : item.currency,
								price    : item.price,
								unit     : item.unit,
								quantity : item.quantity,
							}))
							: undefined,
				},
				[rate?.data?.[GLOBAL_CONSTANTS.zeroth_index]?.destination_locals?.service_id]: {
					service_provider_id : rate.id,
					shipping_line_id    : rate?.data?.[GLOBAL_CONSTANTS.zeroth_index]?.shipping_line_id,
					line_items:
						rate && rate?.data?.[GLOBAL_CONSTANTS.zeroth_index]?.destination_locals?.line_items
							? rate?.data?.[GLOBAL_CONSTANTS.zeroth_index]?.destination_locals
								?.line_items.map((item) => ({
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
		});
		return formattedData;
	}

	selectedRate.forEach((rate) => {
		formattedData = {
			...formattedData,
			[rate?.service_id]: {
				service_provider_id: rate?.id,
				line_items:
					rate && rate?.data?.[GLOBAL_CONSTANTS.zeroth_index]?.line_items
						? rate?.data?.[GLOBAL_CONSTANTS.zeroth_index]?.line_items.map((item) => ({
							code     : item.code,
							name     : item.name,
							price    : item.price,
							currency : item.currency,
							unit     : item.unit,
							quantity : item?.quantity || ONE,
						}))
						: undefined,
			},
		};
	});
	return formattedData;
};

export default formatRates;
