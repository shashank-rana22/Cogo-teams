import { startCase } from '@cogoport/utils';

export const renderValue = (label, detail) => {
	switch (label) 	{
		case 'truck_type':
			return [startCase(detail.truck_type || '')].map((word) => {
				const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
				return capitalized.replace(/(\d+)([a-z]+)/i, '$1 $2');
			}).join(' ');

		case 'trucks_count':
			if (!detail.trucks_count) {
				return null;
			}

			if (detail.trucks_count === 1) {
				return '1 Truck';
			}

			return `${detail.trucks_count} Trucks`;

		default:
			return detail[label] || null;
	}
};
