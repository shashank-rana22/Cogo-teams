import { MultiSelect, Select, SingleDateRange, Toggle } from '@cogoport/components';

export const getElements = (type: string) => {
	switch (type) {
		case 'select':
			return Select;
		case 'multiSelect':
			return MultiSelect;
		case 'singleDateRange':
			return SingleDateRange;
		case 'toggle':
			return Toggle;
		default:
			return null;
	}
};
