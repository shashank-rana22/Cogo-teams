const checkLineItemsSum = (values) => {
	let check = true;
	const message = [];
	let lineItemCheck = false;
	let sumCheck = false;

	(values || []).forEach((value) => {
		let line_item_sum = 0;
		(value?.line_items || []).forEach((line_item) => {
			const { price = 0, quantity = 0 } = line_item;
			line_item_sum += price * quantity;
		});

		if (value?.line_items?.length === 0 && !lineItemCheck) {
			lineItemCheck = true;
			message.push('Atleast one line item should be present');
		}

		if (line_item_sum === 0 && !sumCheck) {
			sumCheck = true;
			message.push('Sum of line items should be > 0');
		}
		check = check && line_item_sum;
	});
	return { check, message };
};

export default checkLineItemsSum;
