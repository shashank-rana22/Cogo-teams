const LINE_ITEMS_LENGTH_CHECK = 0;
const checkLineItemsSum = (values) => {
	let check = true;
	const MESSAGE = [];
	let lineItemCheck = false;
	let sumCheck = false;

	(values || []).forEach((value) => {
		let line_item_sum = 0;
		(value?.line_items || []).forEach((line_item) => {
			const { price = 0, quantity = 0 } = line_item;
			line_item_sum += price * quantity;
		});

		if (value?.line_items?.length === LINE_ITEMS_LENGTH_CHECK && !lineItemCheck) {
			lineItemCheck = true;
			MESSAGE.push('Atleast one line item should be present');
		}

		if (line_item_sum === LINE_ITEMS_LENGTH_CHECK && !sumCheck) {
			sumCheck = true;
			MESSAGE.push('Sum of line items should be > 0');
		}
		check = check && (line_item_sum || value?.service_type === 'air_freight_local_service');
	});
	return { check, message: MESSAGE };
};

export default checkLineItemsSum;
