import { MultiSelect, Select, SingleDateRange } from '@cogoport/components';

export const getElements = (type: string) => {
	switch (type) {
		case 'select':
			return Select;
		case 'multiSelect':
			return MultiSelect;
		case 'singleDateRange':
			return SingleDateRange;
		default:
			return null;
	}
};
