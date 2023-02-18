import { MultiSelect, Select, DateRangepicker } from '@cogoport/components';

export const getElements = (type: string) => {
	switch (type) {
		case 'select':
			return Select;
		case 'multiSelect':
			return MultiSelect;
		case 'dateRangePicker':
			return DateRangepicker;
		default:
			return null;
	}
};
