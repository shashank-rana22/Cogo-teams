import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';

const MINIMUM_COUNT_FOR_PLURAL = 1;

export const renderValue = (label, detail) => {
	switch (label) 	{
		case 'truck_type':
			return [startCase(detail.truck_type || '')].map((word) => {
				const [firstChar, ...remainingChars] = word || '';
				const capitalized = `${firstChar?.toUpperCase()}${remainingChars?.join('')}`;
				return capitalized.replace(GLOBAL_CONSTANTS.regex_patterns.words_prefixed_by_digits, '$1 $2');
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
