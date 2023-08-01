import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import { lineItemsHelper } from '../../utils/lineItemsHelper';

const LINE_ITEMS_KEYS_MAPPING = {
	gc_note                  : 'gcn_no',
	invoice_no               : 'customer_invoice_no',
	invoice_date             : 'invoice_date',
	packages_count           : 'package_count',
	grade                    : 'grade',
	quantity                 : 'delivery_qty',
	truck_no                 : 'truck_no',
	indent_truck_type        : 'indent_truck_type',
	from_station             : 'from_town',
	delivery_station         : 'to_town',
	delivery_date            : 'delivery_date',
	charge_weight            : 'charge_weight',
	rate                     : 'rate',
	freight                  : 'freight',
	loading_unloading_charge : 'loading_unloading',
	detention_charge         : 'detention',
	multipoint_charge        : 'multipoint',
	other_charges            : 'others',
	total_amount             : 'total',
};

const EXTRA_KEYS = ['indent_truck_type', 'delivery_date'];

export const getLineItems = ({ customData = {} }) => {
	const lineItems = lineItemsHelper({
		lineItems: customData?.line_items?.line_items,
		LINE_ITEMS_KEYS_MAPPING,
		customData,
	});

	const finalLineItems = lineItems.map((item) => {
		const finalObj = { ...item };
		EXTRA_KEYS.forEach((key) => {
			if (key.includes('truck_type')) {
				finalObj[key] = customData[key] ? startCase(customData[key]) : '';
			} else if (key.includes('date') || key.includes('time')) {
				finalObj[key] = customData[key]
					? formatDate({ date: customData[key], formatType: 'date' })
					: '';
			} else {
				finalObj[key] = customData[key];
			}
		});
		return finalObj;
	});

	return { lineItems: finalLineItems, LINE_ITEMS_KEYS_MAPPING };
};
