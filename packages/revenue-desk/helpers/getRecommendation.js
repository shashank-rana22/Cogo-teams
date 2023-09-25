import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getRecommendation = ({
	setSupplierPayload,
	allPreferenceCardsData,
	currentFormatedrates,
	systemFormatedRates,
	singleServiceData,
}) => {
	const SERVICE_PROVIDERS = [];
	(allPreferenceCardsData || []).forEach((data) => {
		const rate_id = data?.rate_id;
		const validity_id = data?.validity_id;
		const source = data?.data?.[GLOBAL_CONSTANTS.zeroth_index]?.source;
		let required_rate = {};

		if (source === 'flashed') {
			required_rate = (currentFormatedrates?.rows || []).find((obj) => obj?.id === rate_id);
		} else {
			required_rate = (systemFormatedRates?.rows || []).find((obj) => {
				if (validity_id) {
					return obj?.id === rate_id && obj?.rowData.validity_id === validity_id;
				}
				return obj?.id === rate_id;
			});
		}
		SERVICE_PROVIDERS.push({
			rate_id,
			id             : required_rate?.rowData?.service_provider_id,
			preference_key : source === 'flashed' ? 'current' : 'system',
			data           : required_rate,
			validity_id    : required_rate?.rowData?.validity_id,
		});
	});
	setSupplierPayload((prev) => ({ ...prev, [singleServiceData?.id]: SERVICE_PROVIDERS }));
};

export default getRecommendation;
