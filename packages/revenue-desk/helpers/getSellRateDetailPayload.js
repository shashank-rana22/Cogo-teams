import { SELL_RATE_INCREASE_BY, INCREMENT_VALUE } from '../page-components/constants';

const getSellRateDetailPayload = ({
	systemFormatedRates,
	currentFormatedrates,
	service_providers,
	sellRates,
}) => {
	const singleServiceSellRateDetails = (service_providers || []).map(
		({ rate_id = '' }, index) => {
			const currentRate = (currentFormatedrates?.rows || []).find(
				(rate) => rate.id === rate_id,
			);
			const systemRate = (systemFormatedRates?.rows || []).find(
				(rate) => rate.id === rate_id,
			);
			const rate = currentRate || systemRate || {};
			const sellPrice = Number(rate?.rowData?.price) * SELL_RATE_INCREASE_BY;
			return {
				basic_freight_rate : (Number(sellRates?.[rate_id]) || Number(sellPrice)),
				priority           : index + INCREMENT_VALUE,
				currency           : rate?.rowData?.currency,
				shipping_line_name : rate?.rowData?.shipping_line,
			};
		},
	);

	return singleServiceSellRateDetails;
};
export default getSellRateDetailPayload;
