import { MultiSelect, Select, SingleDateRange, Toggle } from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';

export const getElements = (type: string) => {
	switch (type) {
		case 'select':
			return Select;
		case 'multiSelect':
			return MultiSelect;
		case 'asyncSelect':
			return AsyncSelect;
		case 'singleDateRange':
			return SingleDateRange;
		case 'toggle':
			return Toggle;
		default:
			return null;
	}
};
