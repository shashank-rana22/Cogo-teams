import formatDate from '@cogoport/globalization/utils/formatDate';

export const lineItemsHelper = ({
	lineItems = [],
	lineItemsKeysMapping = {},
	customData = {},
}) => {
	const finalLineItems = (lineItems || []).map((lineItem, index) => {
		const lineItemObj = { id: customData?.shipment_id };
		Object.entries(lineItemsKeysMapping).forEach(([key, value]) => {
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
		lineItemObj.si_no = index + 1;
		return lineItemObj;
	});

	return finalLineItems;
};
