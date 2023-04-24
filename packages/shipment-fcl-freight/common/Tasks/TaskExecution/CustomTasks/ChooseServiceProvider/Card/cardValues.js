import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

const getBuyPrice = (item, source) => {
	let price = item?.charges?.line_items?.[0]?.price;
	let currency = item?.charges?.line_items?.[0]?.currency;

	if (source === 'system_rate') {
		price = item?.validities?.[0]?.price;
		currency = item?.validities?.[0]?.currency;
	} else if (source === 'flash_booking') {
		price = item?.line_items?.[0]?.price;
		currency = item?.line_items?.[0]?.currency;
	}

	return `${currency} ${price}`;
};

const cardValues = (item = {}, data = {}) => {
	const fields = [
		{
			label : 'Supplier Name',
			value : item?.service_provider?.business_name || '',
		},
		{
			label: 'Shipping Line',
			value:
				item?.reverted_shipping_line?.business_name
				|| item?.operator?.business_name
				|| item?.shipping_line.business_name,
		},
		{
			label : 'Source of Rate',
			value : startCase(data?.source),
		},
		{
			label : 'Buy Rate',
			value : getBuyPrice(item, data?.source),
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
