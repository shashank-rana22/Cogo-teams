import formatDate from '@cogoport/globalization/utils/formatDate';

import { lineItemsHelper } from '../../utils/lineItemsHelper';

const LINE_ITEMS_KEY_MAPPING = {
	shipment_id         : 'shipment_id',
	gcn_no              : 'gcn_no',
	gcn_date            : 'gcn_date',
	delivery_qty        : 'delivery_qty',
	truck_no            : 'truck_no',
	from_town           : 'from_town',
	to_town             : 'to_town',
	delivery_date       : 'delivery_date',
	sac_code            : 'sac_code',
	actual_weight       : 'actual_weight',
	charged_weight      : 'charged_weight',
	rate                : 'rate',
	freight             : 'freight',
	loading             : 'loading',
	unloading           : 'unloading',
	loading_detention   : 'loading_detention',
	unloading_detention : 'unloading_detention',
	other_charges       : 'other_charges',
};

const EXTRA_KEYS = ['gcn_date', 'sac_code', 'actual_weight', 'delivery_date'];

export const getLineItems = ({ customData = {} }) => {
	const lineItems = lineItemsHelper({
		lineItems               : customData?.line_items?.line_items,
		LINE_ITEMS_KEYS_MAPPING : LINE_ITEMS_KEY_MAPPING,
		customData,
	});

	const finalLineItems = lineItems.map((item) => {
		const finalObj = { ...item };
		EXTRA_KEYS.forEach((key) => {
			if (key.includes('date') || key.includes('time')) {
				finalObj[key] = customData[key]
					? formatDate({ date: customData[key], formatType: 'date' })
					: '';
			} else {
				finalObj[key] = customData[key];
			}
		});
		return finalObj;
	});

	return { lineItems: finalLineItems, LINE_ITEMS_KEY_MAPPINGS: LINE_ITEMS_KEY_MAPPING };
};
