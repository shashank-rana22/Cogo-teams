import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const SPLICE_FACTOR = 1;

const getServices = (data) => data?.map((item) => (item?.serviceType || '')) || [];

const commonData = (data, services) => services?.map((service) => {
	const filterData = data?.filter((item) => (item?.serviceType === service));
	return filterData;
}).flat() || [];

const remainingData = (data, services) => data?.filter((item) => (!services?.includes(item?.serviceType))) || [];

const getFormattedData = (data) => {
	const { sell_quotation:sellQuotation = {}, buy_quotation:buyQuotation = {} } = data || {};

	const sellQuotationData = sellQuotation.serviceCharges
		?.map((item) => ({ ...item, serviceType: item?.serviceType || 'Platform Fees' }));
	const buyQuotationData = buyQuotation?.serviceCharges || [];

	const sellSevices = getServices(sellQuotationData);
	const buySevices = getServices(buyQuotationData);

	const commonServices = sellSevices.filter((value) => buySevices?.includes(value));
	const uniqueServices = [...new Set(commonServices)];

	const commonBuyData = commonData(buyQuotationData, uniqueServices);
	const remainingBuyData = remainingData(buyQuotationData, uniqueServices);

	const commonSellData = commonData(sellQuotationData, uniqueServices);
	const remainingSellData = remainingData(sellQuotationData, uniqueServices);

	return {
		formattedBuyData  : [...commonBuyData, ...remainingBuyData],
		sellQuotationData : [...commonSellData, ...remainingSellData],
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
