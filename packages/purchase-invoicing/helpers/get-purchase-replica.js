import { isEmpty } from '@cogoport/utils';

import { getPurchaseLineItems } from './mappingsFunc';

const getPurchaseReplica = (data, globalSelected, purchaseInvoiceValues) => {
	let items = [];

	if (isEmpty(globalSelected?.[0]?.buy_line_items)) {
		const buy_line_items = globalSelected?.[0]?.purchase_line_items || [];
		const new_buy = getPurchaseLineItems(buy_line_items, purchaseInvoiceValues);
		const service = data?.service_charges?.[0];

		if (service) {
			items = new_buy.map((item) => ({
				...item,
				service_name     : undefined,
				service_id       : service?.service_id,
				service_type     : service?.service_type,
				price            : 0,
				exchange_rate    : 1,
				tax_percent      : 0,
				tax_price        : 0,
				tax_total_price  : 0,
				alias            : null,
				category         : 'freight',
				cbm_weight_ratio : null,
				discount_price   : null,
				discounts        : null,
				margin_price     : null,
				margins          : [],
				min_price        : null,
				tax_name         : null,
				total_price      : 0,
			}));
		}
	}

	return items;
};

export default getPurchaseReplica;
