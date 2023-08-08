/* eslint-disable custom-eslint/function-name-check */
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

const NUMBERS = {
	ZERO : 0,
	ONE  : 1,
	TWO  : 2,
};
function getTableValue({ key, rowItem, priceData, service_id }) {
	if (key === 'profitability') {
		return `${parseFloat(rowItem?.data?.rowData?.profit_percentage)
			.toFixed(NUMBERS.TWO)}%` || '-';
	}
	if (key === 'buy_price') {
		return formatAmount({
			amount   : rowItem?.data?.rowData?.total_price_in_preferred_currency,
			currency : rowItem?.data?.rowData?.preferred_currency,
			options  : {
				style                 : 'currency',
				currencyDisplay       : 'code',
				maximumFractionDigits : 0,
			},
		}) || '-';
	}
	if (key === 'sell_price') {
		return formatAmount({
			amount: Number(priceData?.[service_id]?.
				[NUMBERS.ONE]
                || GLOBAL_CONSTANTS.zeroth_index) / (Number(priceData?.exchange_rate || NUMBERS.ONE))
                || GLOBAL_CONSTANTS.zeroth_index,
			currency : 'USD',
			options  : {
				style                 : 'currency',
				currencyDisplay       : 'code',
				maximumFractionDigits : 0,
			},
		}) || '-';
	}
	if (key === 'service_provider') { return rowItem?.data?.rowData?.service_provider?.short_name || '-'; }
	if (key === 'shipping_line') { return rowItem?.data?.rowData?.shipping_line || '-'; }
	if (key === 'active_booking') { return rowItem?.data?.rowData?.active_booking || '0'; }
	if (key === 'alloc_ratio') { return rowItem?.data?.rowData?.alloc_ratio || '-'; }
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

export default getTableValue;
