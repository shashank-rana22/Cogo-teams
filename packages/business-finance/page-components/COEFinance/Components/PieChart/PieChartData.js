const DEFAULT_VALUE = 0;
const DENOMINATOR = 1;
const PERCENTAGE_VALUE = 100;
const DECIMAL_PLACE = 2;

export const pieChartData = (pieData = {}) => {
	const {
		bankDetailsRejectedCount, billingPartyRejectCount,
		invoiceDetailsRejectCount, wrongLineItems,
	} = pieData || {};

	const totalData = (Object.values(pieData) || []).reduce(((acc, value) => (acc + value)), DEFAULT_VALUE);

	return [
		{
			id    : 'Bank',
			label : `Bank Details - Collection Party : ${bankDetailsRejectedCount || DEFAULT_VALUE}`,
			value:
			(((bankDetailsRejectedCount || DEFAULT_VALUE) * PERCENTAGE_VALUE)
			/ (totalData || DENOMINATOR)).toFixed(DECIMAL_PLACE),
		},
		{
			id    : 'Billing',
			label : `Billing Party : ${billingPartyRejectCount || DEFAULT_VALUE}`,
			value : (
				((billingPartyRejectCount || DEFAULT_VALUE) * PERCENTAGE_VALUE)
				/ (totalData || DENOMINATOR)).toFixed(DECIMAL_PLACE),
		},
		{
			id    : 'Invoice',
			label : `Invoice Details :  ${invoiceDetailsRejectCount || DEFAULT_VALUE}`,
			value : (
				((invoiceDetailsRejectCount || DEFAULT_VALUE) * PERCENTAGE_VALUE)
				/ (totalData || DENOMINATOR)).toFixed(DECIMAL_PLACE),
		},
		{
			id    : 'Wrong',
			label : `Wrong Line Item : ${wrongLineItems || DEFAULT_VALUE}`,
			value : (((wrongLineItems || DEFAULT_VALUE) * PERCENTAGE_VALUE)
			/ (totalData || DENOMINATOR)).toFixed(DECIMAL_PLACE),
		},
	];
};
