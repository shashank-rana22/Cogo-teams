import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const SPLICE_FACTOR = 1;

const getFormattedData = (data) => {
	const { sell_quotation:sellQuotation = {}, buy_quotation:buyQuotation = {} } = data || {};
	const sellQuotationData = sellQuotation.serviceCharges
		?.map((item) => ({ ...item, serviceType: item.serviceType || 'Platform Fees' }));
	const sellSevices = sellQuotation.serviceCharges?.map((item) => (item.serviceType || 'Platform Fees')) || [];
	const buySevices = buyQuotation.serviceCharges?.map((item) => (item.serviceType || 'Platform Fees')) || [];
	const commonServices = sellSevices.filter((value) => buySevices?.includes(value));
	const commonBuyData = buyQuotation.serviceCharges
		?.filter((item) => (commonServices?.includes(item?.serviceType))) || [];
	const remainingBuyData = buyQuotation.serviceCharges
		?.filter((item) => (!commonServices?.includes(item?.serviceType))) || [];
	const remainingSellData = 	sellQuotation.serviceCharges
		?.filter((item) => (!commonServices?.includes(item?.serviceType))) || [];
	const formattedSellData = commonBuyData?.map((items) => {
		const { serviceType } = items;
		const filterData = sellQuotationData?.filter((item) => (item.serviceType === serviceType)) || [];
		return filterData[GLOBAL_CONSTANTS.zeroth_index];
	});
	return {
		formattedBuyData  : [...commonBuyData, ...remainingBuyData],
		sellQuotationData : [...formattedSellData, ...remainingSellData],
	} || [];
};
export default getFormattedData;

export const toTitleCase = (str) => {
	const titleCase = str
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(GLOBAL_CONSTANTS.zeroth_index).toUpperCase() + word.slice(SPLICE_FACTOR))
		.join(' ');

	return titleCase;
};
