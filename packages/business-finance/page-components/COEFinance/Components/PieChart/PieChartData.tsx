import useGetPieChartData from '../../hook/useGetPieChartData';

export const PieChartData = (filters) => {
	const { pieData } = useGetPieChartData(filters);

	const {
		bankDetailsRejectedCount, billingPartyRejectCount,
		invoiceDetailsRejectCount, wrongLineItems,
	} = pieData || {};

	return [
		{
			id    : 'Bank',
			label : `Bank Details - Collection Party : ${bankDetailsRejectedCount || 0}`,
			value : bankDetailsRejectedCount || 0,
		},
		{
			id    : 'Billing',
			label : `Billing Party : ${billingPartyRejectCount || 0}`,
			value : billingPartyRejectCount || 0,
		},
		{
			id    : 'Invoice',
			label : `Invoice Details :  ${invoiceDetailsRejectCount || 0}`,
			value : invoiceDetailsRejectCount || 0,
		},
		{
			id    : 'Wrong',
			label : `Wrong Line Item : ${wrongLineItems || 0}`,
			value : wrongLineItems || 0,
		},
	];
};
