import formatDate from '@cogoport/globalization/utils/formatDate';

const INDEX_OFFSET = 1;

export const lineItemsHelper = ({
	lineItems = [],
	LINE_ITEMS_KEYS_MAPPING = {},
	customData = {},
}) => {
	const finalLineItems = (lineItems || []).map((lineItem, index) => {
		const lineItemObj = { id: customData?.shipment_id };
		Object.entries(LINE_ITEMS_KEYS_MAPPING).forEach(([key, value]) => {
			if (key.includes('date') || key.includes('time')) {
				lineItemObj[key] = lineItem?.[value]
					? formatDate({ date: lineItem?.[value], formatType: 'date' })
					: '';
			} else if (key.includes('_slash_')) {
				const [firstChoice, secondChoice] = key.split('_slash_');
				lineItemObj[key] = `${lineItem?.[firstChoice] ?? ''}/${
					lineItem?.[secondChoice] ?? ''
				}`;
			} else {
				lineItemObj[key] = lineItem?.[value] ?? '';
			}
		});
		lineItemObj.si_no = index + INDEX_OFFSET;
		return lineItemObj;
	});

	return finalLineItems;
};
