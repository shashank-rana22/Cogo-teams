export const getPurchaseLineItems = (
	purchase_line_items,
	purchaseInvoiceValues,
) => {
	const purchaseLineItems = (purchaseInvoiceValues?.line_items || []).filter(
		(item) => purchase_line_items?.includes(item?.code || item?.name),
	);

	return purchaseLineItems;
};
const mappingsFunc = (data = {}, mappings = {}, purchaseInvoiceValues = {}) => {
	const finalMapping = [];
	const allLineItems = [];
	(data?.service_charges || []).forEach((service) => {
		const items = (service?.line_items || []).map((item) => ({
			...item,
			service_id   : service?.service_id,
			service_type : service?.service_type,
		}));
		allLineItems.push(...items);
	});

	Object.keys(mappings).forEach((key) => {
		const values = mappings[key];
		const { purchase_line_items, buy_line_items } = values || {};

		const finalPurchase = getPurchaseLineItems(
			purchase_line_items,
			purchaseInvoiceValues,
		);

		const buyLinesitems = [];
		buy_line_items?.forEach((item) => {
			const splititems = item?.split(':');
			const founditem = allLineItems?.find(
				(li) => li?.code === splititems[0] && li?.service_id === splititems[1],
			);

			if (founditem) {
				buyLinesitems.push(founditem);
			}
		});

		finalMapping.push({
			purchase_line_items : finalPurchase,
			buy_line_items      : buyLinesitems,
		});
	});

	return finalMapping;
};

export default mappingsFunc;
