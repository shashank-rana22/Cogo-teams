const getFormattedData = (data) => {
	const { sellQuotation = {}, buyQuotation = {} } = data || {};
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
		return filterData[0];
	});
	return {
		formattedBuyData  : [...commonBuyData, ...remainingBuyData],
		sellQuotationData : [...formattedSellData, ...remainingSellData],
	} || [];
};
export default getFormattedData;
