import { getFormattedPrice } from '@cogoport/forms';

export const getFormattedSum = (base, margin, curr = 'INR') => {
	let amount = Number(base) + Number(margin);
	amount = getFormattedPrice(Number(amount), curr);
	return ((amount.substring(4)).split('.'))[0];
};

export const getFormattedAmount = (base, curr = 'INR') => {
	const amount = getFormattedPrice(Number(base), curr);
	return ((amount.substring(4)).split('.'))[0];
};
