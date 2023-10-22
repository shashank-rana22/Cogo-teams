import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

const MINIMUM_PRICE = 1;
const PERCENTAGE = 100;
const NUMBER_FALLBACK = 0;
const BASIC_LINE_ITEMS = ['BAS', 'BASNO'];

export const formatLineItems = ({
	lineItems,
	values,
}) => {
	let is_anycharge_taken = false;
	let lineItemsParams = (lineItems || [])
		.map((item) => {
			if (
				GLOBAL_CONSTANTS.flash_booking_charge_codes.includes(
					item.code,
				) && !is_anycharge_taken
			) {
				const quantity = BASIC_LINE_ITEMS.includes(item?.code) && item?.unit === 'per_kg'
					? Number(values?.chargeable_weight) || item?.quantity
					: item?.quantity;
				const price = values?.price || item?.price;
				const tax_price = (Number(price
					|| NUMBER_FALLBACK) * (item.tax_percent || NUMBER_FALLBACK)) / PERCENTAGE;
				is_anycharge_taken = true;
				return {
					...item,
					quantity,
					price       : Number(price || NUMBER_FALLBACK),
					total_price : Number(price || NUMBER_FALLBACK)
					* (quantity || MINIMUM_PRICE),
					tax_price,
					tax_total_price : tax_price * (quantity || MINIMUM_PRICE),
					currency        : values?.currency || item?.currency,
					min_price       : Number(values?.min_price) || item?.min_price,
				};
			}
			return null;
		})
		.filter((item) => !!item);

	if (isEmpty(lineItemsParams) && lineItems.length) {
		const item = lineItems[GLOBAL_CONSTANTS.zeroth_index];
		const price = values?.price || item?.price;
		const quantity = item?.unit === 'per_kg'
			? Number(values?.chargeable_weight) || item.quantity
			: item.quantity;
		const tax_price = (Number(price || NUMBER_FALLBACK)
		* (item.tax_percent || NUMBER_FALLBACK)) / PERCENTAGE;
		lineItemsParams = [
			{
				...item,
				quantity,
				price           : Number(price || NUMBER_FALLBACK),
				total_price     : Number(price || NUMBER_FALLBACK) * (quantity || 1),
				tax_price,
				tax_total_price : tax_price * (quantity || 1),
				currency        : values?.currency,
			},
		];
	}

	return lineItemsParams;
};

export const formatWeightSlabs = ({ values }) => {
	const formattedWeightSlabs = values?.weight_slabs || [];

	formattedWeightSlabs.forEach((weight_slab, index) => {
		const { lower_limit, upper_limit, price, currency } = weight_slab;
		const floatLowerLimit = +lower_limit || 0;
		const floatUpperLimit = +upper_limit || 0;
		formattedWeightSlabs[index] = {
			...formattedWeightSlabs[index],
			lower_limit  : floatLowerLimit,
			upper_limit  : floatUpperLimit,
			tariff_price : +(values?.price || price || 0),
			unit         : 'per_kg',
			currency     : values?.currency || currency,
		};
	});
	(formattedWeightSlabs || []).sort(
		(a, b) => a.lower_limit - b.lower_limit,
	);

	return formattedWeightSlabs;
};

export const updateLineItems = ({ line_items, quotationLineItems }) => {
	const codeMapping = line_items.reduce((acc, item) => ({ ...acc, [item.code]: item }), {});
	const newLineItems = quotationLineItems.filter((item) => !!codeMapping[item?.code])
		.map((item) => ({ ...item, ...codeMapping[item.code] }));
	return newLineItems;
};
