import formatAmount from '@cogoport/globalization/utils/formatAmount';

const NUMBERS = {
	ZERO : 0,
	ONE  : 1,
	TWO  : 2,
};
function GetTableValue({ key, rowItem }) {
	if (key === 'profitability') {
		return `${parseFloat(rowItem?.data?.rowData?.profit_percentage)
			.toFixed(NUMBERS.TWO)}%` || '-';
	}
	if (key === 'buy_price') {
		return formatAmount({
			amount   : rowItem?.data?.rowData?.total_buy_price_in_preferred_currency,
			currency : rowItem?.data?.rowData?.preferred_currency,
			options  : {
				style                 : 'currency',
				currencyDisplay       : 'code',
				maximumFractionDigits : 2,
			},
		}) || '-';
	}
	if (key === 'sell_price') {
		return formatAmount({
			amount   : Number(rowItem?.data?.rowData?.total_sell_price_in_preferred_currency),
			currency : 'USD',
			options  : {
				style                 : 'currency',
				currencyDisplay       : 'code',
				maximumFractionDigits : 2,
			},
		}) || '-';
	}
	if (key === 'service_provider') {
		return rowItem?.data?.rowData?.service_provider?.short_name
		|| rowItem?.data?.rowData?.service_provider?.business_name || '-';
	}
	if (key === 'shipping_line_/_airline') {
		return rowItem?.data?.rowData?.shipping_line
		|| rowItem?.data?.rowData?.air_line || '-';
	}
	if (key === 'active_booking') { return rowItem?.data?.rowData?.active_booking || '0'; }
	if (key === 'alloc_ratio') { return rowItem?.data?.rowData?.allocation_ratio || '-'; }
	if (key === 'fulfill_ratio') {
		return (
			<div>
				<div style={{ fontSize: '8px', fontWeight: '400' }}>
					2 Days :
					{rowItem?.data?.rowData?.fulfillment_ratio_2 || '--'}
				</div>
				<div style={{ fontSize: '8px', fontWeight: '400' }}>
					7 Days :
					{rowItem?.data?.rowData?.fulfillment_ratio_7 || '--'}
				</div>
				<div style={{ fontSize: '8px', fontWeight: '400' }}>
					30 Days:
					{rowItem?.data?.rowData?.fulfillment_ratio_30 || '--'}
				</div>
			</div>
		);
	}

	return null;
}

export default GetTableValue;
