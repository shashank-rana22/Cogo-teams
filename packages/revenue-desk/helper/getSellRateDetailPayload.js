import { SELL_RATE_INCREASE_BY } from '../page-components/constants';

const getSellRateDetailPayload = ({
	systemFormatedRates,
	currentFormatedrates,
	service_providers,
	sellRates,
}) => {
	const singleServiceSellRateDetails = (service_providers || []).map(
		({ rate_id = '', priority = 0 }) => {
			const currentRate = (currentFormatedrates?.rows || []).find(
				(rate) => rate.id === rate_id,
			);
			const systemRate = (systemFormatedRates?.rows || []).find(
				(rate) => rate.id === rate_id,
			);
			const rate = currentRate || systemRate || {};
			const sellPrice = Number(rate?.rowData?.buy_price) * SELL_RATE_INCREASE_BY;
			return {
				basic_freight_rate : Number(sellRates[rate_id]) || Number(sellPrice),
				priority,
				currency           : rate?.rowData?.currency,
			};
		},
	);

	return singleServiceSellRateDetails;
};
export default getSellRateDetailPayload;
