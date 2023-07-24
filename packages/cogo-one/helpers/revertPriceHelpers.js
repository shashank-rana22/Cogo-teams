import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const MINIMUM_PRICE = 1;
const PERCENTAGE = 100;
const NUMBER_FALLBACK = 0;

export const formatLineItems = ({ lineItems, values }) => {
	const { chargeable_weight = 0, price = 0, currency = '', min_price = 0 } = values || {};
	return (lineItems || []).filter(
		(eachItem) => GLOBAL_CONSTANTS.flash_booking_charge_codes.includes(eachItem?.code),
	).map((eachitem) => {
		const quantity = Number(chargeable_weight) || eachitem.quantity;
		const tax_price = (Number(price) * (eachitem.tax_percent || NUMBER_FALLBACK)) / PERCENTAGE;
		return {
			...eachitem,
			quantity,
			price           : Number(price),
			total_price     : Number(price) * (quantity || MINIMUM_PRICE),
			tax_price,
			tax_total_price : tax_price * (quantity || MINIMUM_PRICE),
			currency,
			min_price       : Number(min_price) || eachitem?.min_price,
		};
	}) || [];
};

export const formatFirstLineItem = ({ lineItems, values }) => {
	const [firstItem] = lineItems || [];
	const quantity = Number(values?.chargeable_weight) || firstItem.quantity;
	const tax_price = (Number(values?.price
					|| NUMBER_FALLBACK) * (firstItem.tax_percent || NUMBER_FALLBACK)) / PERCENTAGE;
	return [
		{
			...firstItem,
			quantity,
			price           : Number(values.price) || NUMBER_FALLBACK,
			total_price     : Number(values.price || NUMBER_FALLBACK) * (quantity || MINIMUM_PRICE),
			tax_price,
			tax_total_price : tax_price * (quantity || MINIMUM_PRICE),
			currency        : values?.currency,
		},
	];
};
