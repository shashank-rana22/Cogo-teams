import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

const getBuyPrice = (item) => {
	const price = item?.price;
	const currency = item?.buy_currency || item?.currency;

	return formatAmount({
		amount  : price,
		currency,
		options : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 2,
		},
	});
};

const cardValues = (item = {}) => {
	const fields = [
		{
			label : 'Supplier Name',
			value : item?.service_provider?.business_name || '',
		},
		{
			label: 'Shipping Line',
			value:
				item?.shipping_line.business_name,
		},
		{
			label : 'Source of Rate',
			value : startCase(item?.source),
		},
		{
			label : 'Buy Rate',
			value : getBuyPrice(item),
		},
		{
			label : 'Sailing Date',
			value : formatDate({
				date       : new Date(),
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			}),
		},
	];
	if (item.remarks) {
		fields.push({
			label : 'Supply Remarks',
			value : item.remarks,
		});
	}
	if (item.supplier_contract_no) {
		fields.push({
			label : 'Supplier Contract No.',
			value : item.supplier_contract_no,
		});
	}
	return fields;
};

export default cardValues;
