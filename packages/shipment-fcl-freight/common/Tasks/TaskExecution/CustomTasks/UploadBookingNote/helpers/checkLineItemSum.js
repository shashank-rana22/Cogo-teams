import { isEmpty } from '@cogoport/utils';

const checkLineItemsSum = (value) => {
	let check = true;
	let lineItemCheck = false;
	let sumCheck = false;

	const MESSAGE = [];
	value.forEach((val) => {
		let line_item_sum = 0;
		(val?.line_items || []).forEach((line_item) => {
			const { price = 0, quantity = 0 } = line_item;
			line_item_sum += price * quantity;
		});
		if (isEmpty(value?.line_items) && !lineItemCheck) {
			lineItemCheck = true;
			MESSAGE.push('Atleast one line item should be present');
		}
		if (!line_item_sum && !sumCheck) {
			sumCheck = true;
			MESSAGE.push('Sum of line items should be > 0');
		}
		check = check && line_item_sum;
	});

	return { check, message: MESSAGE };
};

export default checkLineItemsSum;
