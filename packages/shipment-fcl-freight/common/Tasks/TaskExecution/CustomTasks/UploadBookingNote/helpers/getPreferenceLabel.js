import { getFormattedPrice } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

const getPreferenceLabel = (obj) => [
	{
		id    : 'supplier_name',
		label : 'Supplier Name',
		value : obj?.service_provider?.business_name,
	},
	{
		id    : 'shipping_line',
		label : 'Shipping Line',
		value : obj?.reverted_shipping_line?.business_name || obj?.operator?.business_name
				|| obj?.shipping_line?.business_name,
	},
	{
		id    : 'source_of_rate',
		label : 'Source of Rate',
		value : obj?.source,
	},
	{
		id    : 'buy_rate',
		label : 'Buy Rate',
		value : getFormattedPrice(
			obj?.price,
			obj?.buy_currency || obj?.currency,
		),
	},
	{
		id    : 'sailing_date',
		label : 'Sailing Date',
		value : formatDate({
			date       : new Date(),
			formatType : 'date',
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
		}),
	},
];

export default getPreferenceLabel;
