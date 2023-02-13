import { DateRangepicker, MultiSelect, Select } from '@cogoport/components';

export const getElements = (type: string) => {
	switch (type) {
		case 'select':
			return Select;
		case 'multiSelect':
			return MultiSelect;
		case 'datepicker':
			return DateRangepicker;
		default:
			return null;
	}
};
