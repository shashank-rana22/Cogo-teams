import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const formatRates = (selectedRate) => {
	if (!selectedRate) return {};

	const ONE = 1;
	let formattedData = {};

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
