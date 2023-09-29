interface ChargeInterface {
	serviceType?:string
}
interface CommonInterface {
	serviceCharges?:Array<ChargeInterface>
}
interface FormattedInterface {
	sell_quotation?:CommonInterface
	buy_quotation?:CommonInterface
}

const getFormattedData = (data:FormattedInterface) => {
	const { sell_quotation:sellQuotation = {}, buy_quotation:buyQuotation = {} } = data || {};
	const sellQuotationData = sellQuotation.serviceCharges
		?.map((item) => ({ ...item, serviceType: item.serviceType || 'Platform Fees' }));
	const sellSevices = sellQuotation.serviceCharges?.map((item) => (item.serviceType || 'Platform Fees')) || [];
	const buySevices = buyQuotation.serviceCharges?.map((item) => (item.serviceType || 'Platform Fees')) || [];
	const commonServices = sellSevices.filter((value) => buySevices?.includes(value));

	const buyQuotationData = buyQuotation.serviceCharges
		?.map((item) => ({ ...item, serviceType: item.serviceType || '' }));

	const uniqueServices = [...new Set(commonServices)];

	const commonBuyData = uniqueServices?.map((service) => {
		const filterData = buyQuotationData?.filter((item) => (item?.serviceType === service));
		return filterData;
	}).flat();

	const remainingBuyData = buyQuotationData
		?.filter((item) => (!uniqueServices?.includes(item?.serviceType))) || [];

	const commonSellData = uniqueServices?.map((service) => {
		const filterData = sellQuotationData?.filter((item) => (item?.serviceType === service));
		return filterData;
	}).flat();

	const remainingSellData = sellQuotationData
		?.filter((item) => (!uniqueServices?.includes(item?.serviceType))) || [];

	return {
		formattedBuyData  : [...commonBuyData, ...remainingBuyData],
		sellQuotationData : [...commonSellData, ...remainingSellData],
	} || [];
};
export default getFormattedData;

export const toTitleCase = (str:string) => {
	const titleCase = str
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

	return titleCase;
};
