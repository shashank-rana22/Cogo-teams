import { lineItemsHelper } from '../../utils/lineItemsHelper';

const LINE_ITEMS_KEYS_MAPPING = {
	si_no                : 'si_no',
	lr_number            : 'gcn_no',
	invoice_date         : 'gcn_date',
	loading_time         : 'loading_time',
	from                 : 'from_town',
	destination          : 'to_town',
	truck_number         : 'truck_no',
	commodity            : 'commodity_type',
	bags                 : 'package_count',
	loading_weight       : 'loading_weight',
	charged_weight       : 'charged_weight',
	unloading_weight     : 'unloading_weight',
	repo_date            : 'repo_date',
	in_time              : 'in_time',
	unloading_date       : 'unloading_date',
	out_time             : 'out_time',
	detention_days       : 'detention_days',
	rate                 : 'rate',
	freight_amount       : 'freight_amount',
	detention_at_factory : 'detention_at_factory',
	net_total_amount     : 'net_total_amount',
	excess_weight        : 'excess_weight',
	short_weight         : 'short_weight',
};

export const getLineItems = ({ customData = {} }) => {
	const lineItems = lineItemsHelper({
		lineItems: customData?.line_items?.line_items,
		LINE_ITEMS_KEYS_MAPPING,
		customData,
	});

	return { lineItems, LINE_ITEMS_KEYS_MAPPING };
};
