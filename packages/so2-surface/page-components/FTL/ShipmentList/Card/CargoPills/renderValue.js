import { startCase } from '@cogoport/utils';

const MINIMUM_COUNT_FOR_PLURAL = 1;

export const renderValue = (label, detail) => {
	switch (label) 	{
		case 'truck_type':
			return [startCase(detail.truck_type || '')].map((word) => {
				const [firstChar, ...remainingChars] = word;
				const capitalized = `${firstChar?.toUpperCase()}${remainingChars?.join('')}`;
				return capitalized.replace(/(\d+)([a-z]+)/i, '$1 $2');
			}).join(' ');

		case 'trucks_count':
			if (!detail.trucks_count) {
				return null;
			}

			if (detail.trucks_count === MINIMUM_COUNT_FOR_PLURAL) {
				return '1 Truck';
			}

			return `${detail.trucks_count} Trucks`;

		default:
			return detail[label] || null;
	}
};
