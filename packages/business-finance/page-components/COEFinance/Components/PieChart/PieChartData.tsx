export const pieChartData = (pieData) => {
	const {
		bankDetailsRejectedCount, billingPartyRejectCount,
		invoiceDetailsRejectCount, wrongLineItems,
	} = pieData || {};

	const totalData:any = (Object.values(pieData) || []).reduce(((acc:any, value:any) => (acc + value)), 0);

	return [
		{
			id    : 'Bank',
			label : `Bank Details - Collection Party : ${bankDetailsRejectedCount || 0}`,
			value : (((bankDetailsRejectedCount || 0) * 100) / totalData).toFixed(2),
		},
		{
			id    : 'Billing',
			label : `Billing Party : ${billingPartyRejectCount || 0}`,
			value : (((billingPartyRejectCount || 0) * 100) / totalData).toFixed(2),
		},
		{
			id    : 'Invoice',
			label : `Invoice Details :  ${invoiceDetailsRejectCount || 0}`,
			value : (((invoiceDetailsRejectCount || 0) * 100) / totalData).toFixed(2),
		},
		{
			id    : 'Wrong',
			label : `Wrong Line Item : ${wrongLineItems || 0}`,
			value : (((wrongLineItems || 0) * 100) / totalData).toFixed(2),
		},
	];
};
